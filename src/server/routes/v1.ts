import { Application } from "express";
import { admin, contactus, event } from "../../api/v1/resources";

/**
 * Route based on the version of the API
 * @param {Application} app
 * @returns {}
 */
export default (app: Application) => {
  app.use("/api/v1/admin", admin);
  app.use("/api/v1/contactus", contactus);
  app.use("/api/v1/event", event);
};
