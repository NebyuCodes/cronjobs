import { model } from "mongoose";
import schema from "./schema";
import IEventDoc from "./dto";

export default model<IEventDoc>("Event", schema);
