import nodemailer from 'nodemailer';
import config from '../config/config.js';

export const sendEmail = (subject, body, recipients = config.emailTo) => {
  const transporter = nodemailer.createTransport(config.smtpConfig);

  const mailOptions = {
    from: config.emailFrom,
    to: recipients,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error: ${error}`);
    }
    console.log(`Email sent: ${info.response}`);
  });
};
