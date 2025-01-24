import { schedule, ScheduledTask } from "node-cron";
import { CEventService } from "../api/v1/resources/events/dal";

/**
 * @param {}
 * @returns {}
 */
export const pastEvents = () => {
  const job: ScheduledTask = schedule("* * * * *", async () => {
    console.log("Cron Job Started for updating past events.");
    await CEventService.updatePastEventsStatus(new Date(Date.now()));
  });
  return job;
};
