import { ServerResponse, IncomingMessage } from "http";
import { users } from "..";

export const put = (
  req: IncomingMessage,
  res: ServerResponse,
  url?: string
) => {
  if (url?.startsWith("/api/users/")) {
    const userId = url.split("/").pop();

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);

        if (!username || !age || !hobbies) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              message: "Username, age and hobbies are required fields",
            })
          );
        } else {
          const user = users.find((u) => u.id === userId);

          if (!user) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "User not found" }));
          } else {
            user.username = username;
            user.age = age;
            user.hobbies = hobbies;

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(user));
          }
        }
      } catch {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Internal server error" }));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "non existing resource" }));
  }
};
