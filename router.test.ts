import { describe, it, expect } from "vitest";
import { manageRoutes } from "./router";
import { Request } from "./parser";

describe("manageRoutes", () => {
  it("should return /index.html for root path", () => {
    const request: Request = {
      path: "/",
      verb: "GET",
      httpVersion: "HTTP/1.1",
    };
    const result = manageRoutes(request);
    expect(result).toBe("/index.html");
  });

  it("should return the same path if it has an extension", () => {
    const request: Request = {
      path: "/about.html",
      verb: "GET",
      httpVersion: "HTTP/1.1",
    };
    const result = manageRoutes(request);
    expect(result).toBe("/about.html");
  });

  it("should append .html if no extension is provided", () => {
    const request: Request = {
      path: "/contact",
      verb: "GET",
      httpVersion: "HTTP/1.1",
    };
    const result = manageRoutes(request);

    expect(result).toBe("/contact.html");
  });

  it("should throw an error if no route is provided", () => {
    const request: Request = { path: "", verb: "GET", httpVersion: "HTTP/1.1" };
    expect(() => manageRoutes(request)).toThrow("No route provided");
  });
});
