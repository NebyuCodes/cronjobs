import { schedule, ScheduledTask } from "node-cron";
import { sendEmail } from "./sendEmail";
import { generateReportData } from "./generateReportData";
import EventEmitter from "events";

export const sendReport = (): ScheduledTask => {
  console.log("Cron Job Started for sending a daily report.");
  const job = schedule("*/2 * * * *", async () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on("sendReportEmail", async (data: Email.ISendEmail) => {
      await sendEmail(data);
    });

    const report = await generateReportData();
    if (report) {
      eventEmitter.emit("sendReportEmail", {
        message: report,
        to: "kalkidanbehailu55@gmail.com",
        subject: "Daily report for accounts and messages receieved",
      });
    }
  });
  return job;
};
