import { config } from 'dotenv';
config();

export default {
  smtpConfig: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  emailFrom: process.env.SENDER,
  emailTo: process.env.RECEIVERS.split(','),
  mongoUri: process.env.MONGO_URI,
};
