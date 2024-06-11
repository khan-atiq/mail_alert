import cron from "node-cron";
import dotenv from "dotenv";
import { checkService } from "./services/serviceChecker.js";
import { checkMongoDBAndSendReport } from "./services/dmsReporter.js";

dotenv.config();

const service = {
  host: process.env.SERVICE_HOST,
  port: process.env.SERVICE_PORT
};

// Schedule the service check to run every minute
cron.schedule(process.env.SERVICE_CRON_EXPRESSION, () => {
  console.log(`Running service check for ${service.host}:${service.port}...`);
  checkService(service.host, service.port);
});

// Schedule the MongoDB daily summary email at 6 AM
cron.schedule(process.env.DMS_CRON_EXPRESSION, () => {
  console.log("Running DMS daily summary check...");
  checkMongoDBAndSendReport();
});

// Keep the process running
console.log("Service checker started");