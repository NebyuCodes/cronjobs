import nodemailer from "nodemailer";
import config from "../config";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async (data: Email.ISendEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: true,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as SMTPTransport.Options);

    const info = await transporter.sendMail({
      from: `Friday Night Coding with Neba <${config.email.user}>`,
      to: data.to,
      subject: data.subject,
      text: data.message,
    });
  } catch (error) {
    throw error;
  }
};
