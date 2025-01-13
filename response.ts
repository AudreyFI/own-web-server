import { Request } from "./parser";
import fs from "fs";

export const createResponse = (request: Request, body: string): string => {
  const headers = `${request.httpVersion} 200 OK\r\nContent-Type: text/html\r\n`;
  return `${headers}\r\n${body}`;
};

export const getTemplate = (page: string): string => {
  const templatePath = `www${page}`;
  const exists = fs.existsSync(templatePath);
  if (!exists) {
    throw new Error("The requested page does not exist");
  }

  return fs.readFileSync(templatePath, "utf8");
};
