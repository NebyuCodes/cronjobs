import IAdminDoc from "../dto";
import AdminModel from "../model";
import { hashSync } from "bcryptjs";

export default class CAdminService {
  // Create first account
  static async createFirstAccount(
    data: Admin.ICreateFirstAdminAccount
  ): Promise<IAdminDoc> {
    try {
      const admin = await AdminModel.create({
        ...data,
        role: "Owner",
        first_account: true,
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Create admin
  static async createAdmin(data: Admin.ICreateAdmin): Promise<IAdminDoc> {
    try {
      const defaultPassword = hashSync("mirac@12345");
      const admin = await AdminModel.create({
        ...data,
        password: defaultPassword,
        is_default_password: true,
      });

      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update default password to false
  static async updateDefaultPassword(id: string, password: string) {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        {
          is_default_password: false,
          is_password_changed: true,
          password,
        },
        { runValidators: true, new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Update is password changed
  static async updateIsPasswordChanged(id: string) {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { is_password_changed: false },
        { runValidators: true, new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Update is email or phone number changed
  static async updateIsEmailOrPhonenumberChanged(id: string) {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { is_email_or_phone_number_changed: false },
        { runValidators: true, new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Update admin profile
  static async updateAdminProfile(
    id: string,
    data: Admin.IUpdateAdminProfile
  ): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { ...data },
        { runValidators: true, new: true }
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update Email or phone number
  static async updateEmailOrPhonenumber(
    id: string,
    data: Admin.IUpdateEmailOrPhonenumber
  ): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { ...data, is_email_or_phone_number_changed: true },
        { runValidators: true, new: true }
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update password
  static async updatePassword(
    id: string,
    password: string
  ): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { password, is_password_changed: true },
        { runValidators: true, new: true }
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Reset password
  static async resetPassword(id: string): Promise<IAdminDoc | null> {
    try {
      const defaultPassword = hashSync("mirac@12345");

      const admin = await AdminModel.findByIdAndUpdate(
        id,
        {
          password: defaultPassword,
          is_password_changed: true,
          is_default_password: true,
        },
        { runValidators: true, new: true }
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update admin account status
  static async updateAdminAccountStatus(
    id: string,
    is_active: boolean
  ): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { is_active },
        { runValidators: true, new: true }
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Transfer Ownership
  static async transferOwnership(
    new_role: string,
    from: string,
    to: string
  ): Promise<{ owner: IAdminDoc; admin: IAdminDoc } | null> {
    try {
      const owner = await AdminModel.findByIdAndUpdate(
        from,
        { role: new_role, first_account: false },
        { runValidators: true, new: true }
      );

      const admin = await AdminModel.findByIdAndUpdate(
        to,
        { role: "Owner", first_account: true },
        { runValidators: true, new: true }
      );

      if (owner && admin) {
        return { owner, admin };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Delete an admin
  static async deleteAdmin(id: string): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findByIdAndDelete(id);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Delete multiple admins
  static async deleteMultipleAdmins(ids: string[]): Promise<void> {
    try {
      await AdminModel.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      throw error;
    }
  }

  // Delete all admins
  static async deleteAllAdmins() {
    try {
      await AdminModel.deleteMany({ first_account: false });
    } catch (error) {
      throw error;
    }
  }
}
