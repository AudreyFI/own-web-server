import { Request } from "./parser";

export const manageRoutes = (request: Request): string => {
  let route = request.path === "/" ? "/index.html" : request.path;
  if (!route) {
    throw new Error("No route provided");
  }

  const paths = route.split(".");
  if (paths?.length === 1) {
    route = route + ".html";
  }

  return route;
};
