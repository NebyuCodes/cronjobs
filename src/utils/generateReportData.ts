import { QAdminService } from "../api/v1/resources/admin/dal";
import { QContactusService } from "../api/v1/resources/contactus/dal";

/**
 * @param {}
 * @returns {string}
 */

export const generateReportData = async (): Promise<string> => {
  try {
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0);

    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);

    const admins = await QAdminService.getAdminsCreatedToday(
      startToday,
      endToday
    );
    const messages = await QContactusService.getMessagesReceivedToday(
      startToday,
      endToday
    );
    return `Admins created today- ${admins}, Messages received today - ${messages}`;
  } catch (error) {
    throw error;
  }
};
