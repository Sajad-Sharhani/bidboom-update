import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import type { MailOptions } from "nodemailer/lib/json-transport";

let transporter: ReturnType<typeof nodemailer.createTransport>;

function getTransporter() {
  const {
    MAIL,
    MAIL_PASS,
  } = process.env;

  return nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: MAIL,
        pass: MAIL_PASS,
      },
    })
  );
}

export function sendMail(options: Omit<MailOptions, "from">) {
  const { MAIL } = process.env;
  if (!transporter) {
    transporter = getTransporter();
  }
  return transporter.sendMail({ from: MAIL, ...options });
}
