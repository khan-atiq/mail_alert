import { MongoClient } from "mongodb";
import config from "../config/config.js";
import { sendEmail } from "../email/emailService.js";
import { getDates, getYesterdayDate } from "../utils/dateUtils.js";


export const checkMongoDBAndSendReport = async () => {
  const client = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db("apiBlender");
    const applications = db.collection("accountnumbers");

    const {yesterday, tomorrow} = getDates();

    const totalRecords = await applications.countDocuments({
      Timestamp: {
        $gte: yesterday,
        $lt: tomorrow
      }
    });

    const completedCount = await applications.countDocuments({
      Timestamp: {
        $gte: yesterday,
        $lt: tomorrow
      },
      Status: "Completed"
    });

    const failedCount = await applications.countDocuments({
      Timestamp: {
        $gte: yesterday,
        $lt: tomorrow
      },
      Status: "Failed"
    });

    const pendingCount = await applications.countDocuments({
      Timestamp: {
        $gte: yesterday,
        $lt: tomorrow
      },
      Status: "Pending"
    });

    const emailSubject = `DMS upload report - ${getYesterdayDate().toDateString()}`;
    const emailBody = `Total account numbers Received: ${totalRecords}\n` +
                      `Successfully sent to DMS: ${completedCount}\n` +
                      `Some files failed to sent to DMS: ${failedCount}\n` +
                      `Failed to send to DMS (Due to some technical issue): ${pendingCount}`;

    sendEmail(emailSubject, emailBody);
  } catch (error) {
    console.error(`Error checking MongoDB: ${error}`);
  } finally {
    await client.close();
  }
};

