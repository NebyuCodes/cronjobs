import { Document } from "mongoose";

export default interface IEventDoc extends Document {
  title: string;
  title_slug: string;
  description: string;
  img_secure_url: string;
  img_public_id: string;
  external_link: string;
  start_date: Date;
  end_date: Date;
  event_location: string;
  is_active: boolean;
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Event {
    interface ICreateEvent {
      title: string;
      description: string;
      start_date: Date;
      end_date: Date;
      event_thumbnail: string;
      img_public_id?: string;
      external_link?: string;
      event_location?: string;
      is_draft?: boolean;
    }
    interface IUpdateEvent {
      title?: string;
      description?: string;
      start_date: Date;
      end_date: Date;
      external_link?: string;
      event_location?: string;
      is_draft?: boolean;
    }
    interface IUpdateEventImage {
      event_thumbnail: string;
      img_public_id?: string;
    }
    interface IUpdateStatus {
      is_active: boolean;
    }
    interface IDeleteMultipleEvents {
      ids: string[];
    }
    interface IDeleteAllEvents {
      delete_key: string;
      state?: "all";
    }
  }
}
