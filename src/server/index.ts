import { createServer } from "http";
import app from "./app";
import db from "./db";
import { pastEvents } from "../utils/pastEvents";
import { stopCronJobs } from "../utils/stopCronJobs";
import { sendReport } from "../utils/sendReport";
/**
 * Server
 * @param {}
 * @returns {}
 */
export default () => {
  const port = (process.env.PORT as unknown as number) || 3000;

  const server = createServer(app);

  const eventJob = pastEvents();
  const sendReportJob = sendReport();

  server.listen(port, () => {
    console.log(`Listening on ${port}...`);
  });

  const mongo = db.mongo();

  // Majestic close
  process.on("SIGINT", () => {
    mongo.close();
    stopCronJobs([
      { job: eventJob, jobName: "Event job" },
      { job: sendReportJob, jobName: "Send Report job" },
    ]);
    server.close(() => {
      console.log("Server is closing");
    });
  });

  process.on("SIGTERM", () => {
    stopCronJobs([{ job: eventJob, jobName: "Event Job" }]);
  });
};
