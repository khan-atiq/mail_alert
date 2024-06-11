import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stateFile = path.resolve(__dirname, "../service_state.json");

export const getServiceState = (host, port) => {
  if (fs.existsSync(stateFile)) {
    const data = JSON.parse(fs.readFileSync(stateFile, "utf8"));
    return data[`${host}:${port}`] ?? true; // Default to true if no state exists for the service
  }
  return true;
};

export const setServiceState = (host, port, isServiceUp) => {
  let data = {};
  if (fs.existsSync(stateFile)) {
    data = JSON.parse(fs.readFileSync(stateFile, "utf8"));
  }
  data[`${host}:${port}`] = isServiceUp;
  fs.writeFileSync(stateFile, JSON.stringify(data), "utf8");
};
