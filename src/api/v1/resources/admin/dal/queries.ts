import AdminModel from "../model";
import IAdminDoc from "../dto";
import APIFeatures from "../../../../../utils/api_features";

export default class QAdminService {
  static async getAllAdmins(
    query?: RequestQuery
  ): Promise<{ admins: IAdminDoc[]; results: number }> {
    try {
      const apiFeatures = new APIFeatures<IAdminDoc>(AdminModel.find(), query)
        .filter()
        .project()
        .sort()
        .paginate();
      const admins = await apiFeatures.dbQuery;
      const results = await AdminModel.countDocuments();
      return { admins, results };
    } catch (error) {
      throw error;
    }
  }

  static async getFirstAdminAccount(): Promise<IAdminDoc | null> {
    try {
      const firstAccount = await AdminModel.findOne({ first_account: true });
      return firstAccount;
    } catch (error) {
      throw error;
    }
  }

  static async adminLogin(
    email_or_phone_number: string
  ): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findOne({
        $or: [
          { email: email_or_phone_number },
          { phone_number: email_or_phone_number },
        ],
      }).select("password");
      return admin;
    } catch (error) {
      throw error;
    }
  }

  static async getAdmin(
    id: string,
    get_password?: boolean
  ): Promise<IAdminDoc | null> {
    try {
      let admin;
      if (get_password) {
        admin = await AdminModel.findById(id).select("password");
      } else {
        admin = await AdminModel.findById(id);
      }

      return admin;
    } catch (error) {
      throw error;
    }
  }

  static async getOwner(): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findOne({ role: "Owner" });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  static async countAdminDocuments(): Promise<number> {
    try {
      const admins = await AdminModel.countDocuments();
      return admins;
    } catch (error) {
      throw error;
    }
  }

  static async getAdminsCreatedToday(
    startToday: Date,
    endToday: Date
  ): Promise<number> {
    try {
      const admins = await AdminModel.countDocuments({
        createdAt: { $gte: startToday, $lt: endToday },
      });
      return admins;
    } catch (error) {
      throw error;
    }
  }
}
