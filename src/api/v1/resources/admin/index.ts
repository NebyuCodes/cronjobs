import { Router } from "express";
const router = Router();

import { validator, protect, auth } from "../../middlewares";

import {
  createFirstAdminAccountValidation,
  createAdminValidation,
  adminLoginValidation,
  updateDefaultPasswordValidation,
  updateAdminProfileValidation,
  updateEmailOrPhonenumberValidation,
  updatePasswordValidation,
  updateAdminAccountStatusValidation,
  transferOwnershipValidation,
  deleteAllAdminsValidation,
  deleteMultipleAdminsValidation,
} from "./validations";

import {
  createFirstAdminAccount,
  createAdmin,
  adminLogin,
  getAllAdmins,
  getAdmin,
  updateDefaultPassword,
  updateAdminProfile,
  updateEmailOrPhonenumber,
  updatePassword,
  updateAdminAccountStatus,
  resetPassword,
  transferOwnership,
  deleteAdmin,
  deleteMultipleAdmins,
  deleteAllAdmins,
  numberOfAdmins,
} from "./controller";

router.get("/count", numberOfAdmins);

router.post(
  "/firstaccount",
  validator(createFirstAdminAccountValidation),
  createFirstAdminAccount
);

router.post("/login", validator(adminLoginValidation), adminLogin);

router.delete(
  "/multiple",
  protect,
  validator(deleteMultipleAdminsValidation),
  deleteMultipleAdmins
);

router
  .route("/")
  .get(protect, auth("Owner", "Super-admin", "Admin"), getAllAdmins)
  .post(
    protect,
    auth("Owner", "Super-admin"),
    validator(createAdminValidation),
    createAdmin
  )
  .delete(
    protect,
    auth("Owner"),
    validator(deleteAllAdminsValidation),
    deleteAllAdmins
  );

router.patch(
  "/:id/defaultpassword",
  validator(updateDefaultPasswordValidation),
  updateDefaultPassword
);

router.patch(
  "/:id/profile",
  protect,
  auth("Owner", "Super-admin", "Admin"),
  validator(updateAdminProfileValidation),
  updateAdminProfile
);

router.patch(
  "/:id/emailorphonenumber",
  protect,
  auth("Owner", "Super-admin", "Admin"),
  validator(updateEmailOrPhonenumberValidation),
  updateEmailOrPhonenumber
);

router.patch(
  "/:id/password",
  protect,
  auth("Owner", "Super-admin", "Admin"),
  validator(updatePasswordValidation),
  updatePassword
);

router.patch(
  "/:id/resetpassword",
  protect,
  auth("Owner", "Super-admin"),
  resetPassword
);

router.patch(
  "/:id/status",
  protect,
  auth("Owner", "Super-admin"),
  validator(updateAdminAccountStatusValidation),
  updateAdminAccountStatus
);

router.patch(
  "/:id/transfer",
  protect,
  auth("Owner"),
  validator(transferOwnershipValidation),
  transferOwnership
);

router
  .route("/:id")
  .get(protect, auth("Owner", "Super-admin", "Admin"), getAdmin)
  .delete(protect, auth("Owner"), deleteAdmin);

export default router;
