import { ScheduledTask } from "node-cron";

/**
 * @param {}
 * @returns {}
 */
export const stopCronJobs = (
  jobData: { job: ScheduledTask; jobName: string }[]
) => {
  jobData.forEach((data) => {
    data.job.stop();
    console.log(`${data.jobName} has stopped.`);
  });
};
