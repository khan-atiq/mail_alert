import { exec } from "child_process";
import os from "os";
import { getServiceState, setServiceState } from "../utils/fileUtils.js";
import { sendEmail } from "../email/emailService.js";

export const checkService = (serviceHost, servicePort) => {
  exec(`nc -vz ${serviceHost} ${servicePort}`, (error, stdout, stderr) => {
    const wasServiceUp = getServiceState(serviceHost, servicePort);
    if (error) {
      if (wasServiceUp) {
        const emailBody = `
  <html>
    <body>
      <p>
        The NFS service at <b>${serviceHost}:${servicePort}</b> is <span style="color: red;">DOWN</span> on <b>${os.hostname()} at ${new Date()}</b>.
      </p>
    </body>
  </html>
`;
        console.log("Service is down, sending email alert...");
        sendEmail(
          `Service Down Alert: ${serviceHost}:${servicePort}`,
          emailBody
        );
        setServiceState(serviceHost, servicePort, false);
      } else {
        console.log("Service is still down.");
      }
    } else {
      if (!wasServiceUp) {
        const emailBody = `
  <html>
    <body>
      <p>
        The NFS service at <b>${serviceHost}:${servicePort}</b> is <span style="color: green;">UP</span> on <b>${os.hostname()} at ${new Date()}</b>.
      </p>
    </body>
  </html>
`;
        console.log("Service is up, sending email alert...");
        sendEmail(`Service Up Alert: ${serviceHost}:${servicePort}`, emailBody);
        setServiceState(serviceHost, servicePort, true);
      } else {
        console.log(`Service at ${serviceHost}:${servicePort} is reachable.`);
      }
    }
  });
};
