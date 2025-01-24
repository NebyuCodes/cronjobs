import { NextFunction, Request, Response } from "express";
import AppError from "../../../utils/app_error";
import { verifyToken } from "../../../utils/token";
import { QAdminService } from "../resources/admin/dal";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new AppError("Please login.", 400));

    const decodedData = verifyToken(token);

    if (decodedData.role === "admin") {
      // Check if the admin exists
      const admin = await QAdminService.getAdmin(decodedData.id);
      if (!admin) return next(new AppError("Admin does not exists", 400));

      // Check if it is a default password
      if (admin.is_default_password)
        return next(new AppError("Please update your default password.", 400));

      // Check if it is active or inactive
      if (!admin.is_active)
        return next(
          new AppError(
            "Your account is inactive. Please contact the owner.",
            400
          )
        );

      // Check if phone number or email is changed
      if (admin.is_email_or_phone_number_changed)
        return next(
          new AppError(
            "Phone number or email is changed. Please login again.",
            400
          )
        );

      // Check if password is changed
      if (admin.is_password_changed)
        return next(
          new AppError("Password is changed. Please login again.", 400)
        );

      req.user = admin;
    }
    next();
  } catch (error) {
    next(error);
  }
};
