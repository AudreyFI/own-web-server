export type Request = {
  verb: string;
  path: string;
  httpVersion: string;
};

export const parseRequest = (data: Buffer | string): Request | null => {
  // split data line by line to keep only the first
  const response = data?.toString()?.split("\r\n")?.[0];

  // retrieve the verb, path and http version
  const [verb, path, httpVersion] = response?.split(" ");

  // handle special case for favicon
  if (path === "/favicon.ico") {
    return null;
  }
  return { verb, path, httpVersion };
};
