import IEventDoc from "../dto";
import EventModel from "../model";
import slugify from "slugify";

export default class CEventService {
  // Create an event
  static async createEvent(data: Event.ICreateEvent): Promise<IEventDoc> {
    try {
      const event = await EventModel.create({
        ...data,
        title_slug: slugify(data.title.toLowerCase(), "_"),
      });
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Update event
  static async updateEvent(
    id: string,
    data: Event.IUpdateEvent
  ): Promise<IEventDoc | null> {
    try {
      let event = await EventModel.findByIdAndUpdate(
        id,
        { ...data },
        { runValidators: true, new: true }
      );
      if (data.title) {
        event = await EventModel.findByIdAndUpdate(
          id,
          { ...data, title_slug: slugify(data.title.toLowerCase(), "_") },
          { runValidators: true, new: true }
        );
      }

      return event;
    } catch (error) {
      throw error;
    }
  }

  // Update event image
  static async updateEventImage(
    id: string,
    data: Event.IUpdateEventImage
  ): Promise<IEventDoc | null> {
    try {
      const event = await EventModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Update past events to in active
  static async updatePastEventsStatus(currentDate: Date): Promise<void> {
    try {
      await EventModel.updateMany(
        {
          end_date: { $lt: currentDate },
          is_active: true,
        },
        { is_active: false },
        { runValidators: true, new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Update event status
  static async updateEventStatus(
    id: string,
    is_active: boolean
  ): Promise<IEventDoc | null> {
    try {
      const event = await EventModel.findByIdAndUpdate(
        id,
        { is_active },
        { runValidators: true, new: true }
      );
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Delete an event
  static async deleteEvent(id: string): Promise<IEventDoc | null> {
    try {
      const event = await EventModel.findByIdAndDelete(id);
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Delete Multiple Admins
  static async deleteMultipleEvents(ids: string[]): Promise<void> {
    try {
      await EventModel.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      throw error;
    }
  }

  // Delete all events
  static async deleteAllEvents(state?: "all") {
    try {
      if (state) {
        await EventModel.deleteMany({});
      } else {
        await EventModel.deleteMany({ is_active: false });
      }
    } catch (error) {
      throw error;
    }
  }
}
