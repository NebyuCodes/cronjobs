import { model } from "mongoose";
import schema from "./schema";
import IAdminDoc from "./dto";

export default model<IAdminDoc>("Admin", schema);
