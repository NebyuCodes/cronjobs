import { deleteMessage } from "../controller";
import IContactusDoc from "../dto";
import ContactusModel from "../model";

export default class CContactusService {
  // Create a message
  static async createMessage(
    data: Contactus.ICreateMessage
  ): Promise<IContactusDoc> {
    try {
      const message = await ContactusModel.create({ ...data });
      return message;
    } catch (error) {
      throw error;
    }
  }

  // Update message read status
  static async updateReadStatus(id: string) {
    try {
      const message = await ContactusModel.findByIdAndUpdate(
        id,
        { is_read: true },
        { runValidators: true, new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Delete a message
  static async deleteMessage(id: string): Promise<IContactusDoc | null> {
    try {
      const message = await ContactusModel.findByIdAndDelete(id);
      return message;
    } catch (error) {
      throw error;
    }
  }

  // Delete Multiple Messages
  static async deleteMultipleMessages(ids: string[]): Promise<void> {
    try {
      await ContactusModel.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      throw error;
    }
  }

  // Delete all messages
  static async deleteAllMessages() {
    try {
      await ContactusModel.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}
