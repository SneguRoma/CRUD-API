import { ServerResponse } from "http";
import { users } from "..";
import { nonExRes, notFoundUser } from "./constants";

export const get = (res: ServerResponse, url?: string) => {
  if (url === "/api/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users));
  } else if (url?.startsWith("/api/users/")) {
    const userId = url.split("/").pop();
    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: notFoundUser }));
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(user));
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: nonExRes }));
  }
};
