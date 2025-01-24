import { model } from "mongoose";
import schema from "./schema";
import IContactusDoc from "./dto";

export default model<IContactusDoc>("Contactus", schema);
