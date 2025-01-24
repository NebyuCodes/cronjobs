import ContactusModel from "../model";
import APIFeatures from "../../../../../utils/api_features";
import IContactusDoc from "../dto";

export default class QContactusService {
  // Get all messages
  static async getAllMessages(
    query?: RequestQuery
  ): Promise<{ messages: IContactusDoc[]; results: number }> {
    try {
      const apiFeatures = new APIFeatures<IContactusDoc>(
        ContactusModel.find(),
        query
      )
        .filter()
        .project()
        .sort()
        .paginate();
      const messages = await apiFeatures.dbQuery;
      const results = await ContactusModel.countDocuments();
      return { messages, results };
    } catch (error) {
      throw error;
    }
  }

  // Get a message
  static async getMessage(id: string): Promise<IContactusDoc | null> {
    try {
      const message = await ContactusModel.findById(id);
      return message;
    } catch (error) {
      throw error;
    }
  }

  static async countContactusDocuments(): Promise<number> {
    try {
      const messages = await ContactusModel.countDocuments();
      return messages;
    } catch (error) {
      throw error;
    }
  }

  static async getMessagesReceivedToday(
    startToday: Date,
    endToday: Date
  ): Promise<number> {
    try {
      const messages = await ContactusModel.countDocuments({
        createdAt: { $gte: startToday, $lt: endToday },
      });
      return messages;
    } catch (error) {
      throw error;
    }
  }
}
