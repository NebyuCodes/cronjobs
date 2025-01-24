import { Document } from "mongoose";

export default interface IContactusDoc extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
  is_read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Contactus {
    interface ICreateMessage {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      message: string;
    }
    interface IDeleteMultipleMessages {
      ids: string[];
    }
    interface IDeleteAllMessages {
      delete_key: string;
    }
  }
}
