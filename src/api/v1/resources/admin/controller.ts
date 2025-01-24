import { CAdminService, QAdminService } from "./dal";
import { RequestHandler } from "express";
import AppError from "../../../../utils/app_error";
import { hashSync, compareSync } from "bcryptjs";
import { generateToken, verifyToken } from "../../../../utils/token";
import config from "../../../../config";
import IAdminDoc from "./dto";

// Create first account
export const createFirstAdminAccount: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Check if there is a first account
    const firstAccount = await QAdminService.getFirstAdminAccount();
    if (firstAccount)
      return next(
        new AppError(
          "There is already a first account. You can not create one.",
          400
        )
      );

    // Get body
    const data = <Admin.ICreateFirstAdminAccount>req.value;

    const password = hashSync(data.password, 12);

    const admin = await CAdminService.createFirstAccount({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      password,
    });

    res.status(200).json({
      status: "SUCCESS",
      message: "First account is successfully created",
    });
  } catch (error) {
    next(error);
  }
};

// Create admin
export const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const data = <Admin.ICreateAdmin>req.value;

    const admin = await CAdminService.createAdmin(data);

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin account is successfully created",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin login
export const adminLogin: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const { email_or_phone_number, password } = <Admin.IAdminLogin>req.value;

    // Get admin, and check password
    const admin = await QAdminService.adminLogin(email_or_phone_number);
    if (!admin || !compareSync(password, admin.password))
      return next(
        new AppError("Invalid login credential. Please try again.", 400)
      );

    // Generate token
    const token = generateToken(admin.id, "admin");

    // Admin data
    const adminData = await QAdminService.getAdmin(admin.id);

    // Check if password, email or phone number changed
    if (adminData) {
      if (adminData.is_password_changed) {
        await CAdminService.updateIsPasswordChanged(adminData.id);
      }

      if (adminData.is_email_or_phone_number_changed) {
        await CAdminService.updateIsEmailOrPhonenumberChanged(adminData.id);
      }
    }

    res.status(200).json({
      status: "SUCCESS",
      message: "Successfully logged in",
      data: {
        admin: adminData,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Update default password
export const updateDefaultPassword: RequestHandler = async (req, res, next) => {
  try {
    // Get admin
    const admin = await QAdminService.getAdmin(req.params.id, true);
    if (!admin) return next(new AppError("Admin does not exists", 404));

    // Get body
    const { default_password, password } = <Admin.IUpdateDefaultPassword>(
      req.value
    );

    // Check the current password
    if (!compareSync(default_password, admin.password))
      return next(new AppError("Incorrect default password", 400));

    // Hash the password
    const hashedPassword = hashSync(password);

    await CAdminService.updateDefaultPassword(admin.id, hashedPassword);

    res.status(200).json({
      status: "SUCCESS",
      message: "Default password is successfully updated. Please login",
    });
  } catch (error) {
    next(error);
  }
};

// Get all admins
export const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const { admins, results } = await QAdminService.getAllAdmins(req.query);

    res.status(200).json({
      status: "SUCCESS",
      results: admins.length,
      totalResult: results,
      data: {
        admins,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single admin
export const getAdmin: RequestHandler = async (req, res, next) => {
  try {
    const admin = await QAdminService.getAdmin(req.params.id);
    if (!admin) return next(new AppError("Admin does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update profile
export const updateAdminProfile: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const data = <Admin.IUpdateAdminProfile>req.value;

    if (data.role) {
      const getAdmin = await QAdminService.getAdmin(req.params.id);
      if (!getAdmin) return next(new AppError("Admin does not exists", 404));

      if (getAdmin.role === "Owner")
        return next(
          new AppError("You can not change the role of the owner", 400)
        );
    }

    const admin = await CAdminService.updateAdminProfile(req.params.id, data);

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin profile is successfully updated",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update email or phone number
export const updateEmailOrPhonenumber: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Get admin
    let admin = await QAdminService.getAdmin(req.params.id);
    if (!admin) return next(new AppError("Admin does not exists", 404));

    const data = <Admin.IUpdateEmailOrPhonenumber>req.value;

    // Check if email or phone number is changed
    if (
      admin.phone_number !== data.phone_number ||
      admin.email !== data.email
    ) {
      admin = await CAdminService.updateEmailOrPhonenumber(req.params.id, data);
    }

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin profile is successfully updated",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update password
export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    // Admin data
    const adminData = await QAdminService.getAdmin(req.params.id, true);
    if (!adminData) return next(new AppError("Admin does not exists", 404));

    // Get body
    const { current_password, password } = <Admin.IUpdatePassword>req.value;

    // Check current password
    if (!compareSync(current_password, adminData.password))
      return next(new AppError("Incorrect current password", 400));

    // Hash password
    const hashedPassword = hashSync(password);

    await CAdminService.updatePassword(adminData.id, hashedPassword);

    res.status(200).json({
      status: "SUCCESS",
      message: "Password is successfully updated. Please login.",
    });
  } catch (error) {
    next(error);
  }
};

// Reset password
export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    // Check if the admin is resetting his or her own password
    const { id } = <IAdminDoc>req.user;
    if (id === req.params.id)
      return next(new AppError("You can not reset your own password.", 400));

    const getAdmin = await QAdminService.getAdmin(req.params.id);
    if (!getAdmin) return next(new AppError("Admin  does not exists", 404));

    if (getAdmin.role === "Owner")
      return next(
        new AppError("You can not update the account status of the owner", 400)
      );

    const admin = await CAdminService.resetPassword(req.params.id);
    if (!admin) return next(new AppError("Admin  does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      message:
        "Password is successfully resetted. Please login using the default password, and update it.",
    });
  } catch (error) {
    next(error);
  }
};

// Update admin account status
export const updateAdminAccountStatus: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Get body
    const { is_active } = <Admin.IUpdateAdminAccountStatus>req.value;

    const getAdmin = await QAdminService.getAdmin(req.params.id);
    if (!getAdmin) return next(new AppError("Admin  does not exists", 404));

    if (getAdmin.role === "Owner")
      return next(
        new AppError("You can not update the account status of the owner", 400)
      );

    const { id } = <IAdminDoc>req.user;
    if (id === req.params.id)
      return next(
        new AppError("You can not change the status your own account.", 400)
      );

    const admin = await CAdminService.updateAdminAccountStatus(
      req.params.id,
      is_active
    );

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin account status is successfully updated",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Transfer ownership
export const transferOwnership: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const { new_role } = <Admin.ITransferOwnership>req.value;

    // Get owner
    const owner = await QAdminService.getOwner();
    if (!owner) return next(new AppError("Owner does not exists", 404));

    if (owner.id === req.params.id)
      return next(new AppError("You are already an owner", 400));

    const result = await CAdminService.transferOwnership(
      new_role,
      owner.id,
      req.params.id
    );
    if (!result) return next(new AppError("Admin does not exists", 404));

    res.status(200).json({
      status: "SUCCESs",
      message: "Ownership is successfully transferred",
      data: {
        owner: result.admin,
        admin: result.owner,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete an admin
export const deleteAdmin: RequestHandler = async (req, res, next) => {
  try {
    const getAdmin = await QAdminService.getAdmin(req.params.id);
    if (!getAdmin) return next(new AppError("Admin  does not exists", 404));

    if (getAdmin.role === "Owner")
      return next(
        new AppError("You can not update the account status of the owner", 400)
      );

    const admin = await CAdminService.deleteAdmin(req.params.id);
    if (!admin) return next(new AppError("Admin does not exists", 400));

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin account is successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Delete Multiple Admins
export const deleteMultipleAdmins: RequestHandler = async (req, res, next) => {
  try {
    const { ids } = <Admin.IDeleteMultipleAdmins>req.value;

    await CAdminService.deleteMultipleAdmins(ids);

    res.status(200).json({
      status: "SUCCESS",
      message: "Multiple admins are successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Delete all admins
export const deleteAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    // Check delete key
    const { delete_key } = <Admin.IDeleteAllAdmins>req.value;
    if (config.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 400));

    await CAdminService.deleteAllAdmins();

    res.status(200).json({
      status: "SUCCESS",
      message:
        "All admins accounts are deleted. The first account still does exists",
    });
  } catch (error) {
    next(error);
  }
};

// Number of admins
export const numberOfAdmins: RequestHandler = async (req, res, next) => {
  try {
    const admins = await QAdminService.countAdminDocuments();

    res.status(200).json({
      status: "SUCCESS",
      results: admins,
    });
  } catch (error) {
    next(error);
  }
};
