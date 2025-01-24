import { Document } from "mongoose";

export default interface IAdminDoc extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  password: string;
  first_account: boolean;
  is_active: boolean;
  is_default_password: boolean;
  is_password_changed: boolean;
  is_email_or_phone_number_changed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Admin {
    interface ICreateFirstAdminAccount {
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
      password: string;
    }
    interface ICreateAdmin {
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
      role: string;
    }
    interface IAdminLogin {
      email_or_phone_number: string;
      password: string;
    }
    interface IUpdateDefaultPassword {
      default_password: string;
      password: string;
    }
    interface IUpdateAdminProfile {
      first_name?: string;
      last_name?: string;
      role?: string;
    }
    interface IUpdateEmailOrPhonenumber {
      email: string;
      phone_number: string;
    }
    interface IUpdatePassword {
      current_password: string;
      password: string;
    }
    interface IUpdateAdminAccountStatus {
      is_active: boolean;
    }
    interface ITransferOwnership {
      new_role: string;
    }
    interface IDeleteMultipleAdmins {
      ids: string[];
    }
    interface IDeleteAllAdmins {
      delete_key: string;
    }
  }
}
