import EventModel from "../model";
import APIFeatures from "../../../../../utils/api_features";
import IEventDoc from "../dto";

export default class QEventService {
  // Get all events
  static async getAllEvents(
    query?: RequestQuery
  ): Promise<{ events: IEventDoc[]; results: number }> {
    try {
      const apiFeatures = new APIFeatures<IEventDoc>(EventModel.find(), query)
        .filter()
        .project()
        .sort()
        .paginate();
      const events = await apiFeatures.dbQuery;
      const results = await EventModel.countDocuments();
      return { events, results };
    } catch (error) {
      throw error;
    }
  }

  // Get an event
  static async getEvent(id: string): Promise<IEventDoc | null> {
    try {
      const event = await EventModel.findById(id);
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Get an event using slug
  static async getEventBySlug(title_slug: string): Promise<IEventDoc | null> {
    try {
      const event = await EventModel.findOne({ title_slug });
      return event;
    } catch (error) {
      throw error;
    }
  }

  static async countEventDocuments(query?: RequestQuery): Promise<number> {
    try {
      let events: number = 0;

      if (query && query.is_prod === "true") {
        events = await EventModel.countDocuments({ is_active: true });
      } else {
        events = await EventModel.countDocuments();
      }
      return events;
    } catch (error) {
      throw error;
    }
  }
}
