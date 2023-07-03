import * as http from "http";
import "dotenv/config";
//import { v4 as uuidv4 } from 'uuid';
import { get } from "./responses/get";
import { post } from "./responses/post";
import { put } from "./responses/put";
import { remove } from "./responses/remove";

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export const users: User[] = [];
const port = process.env.PORT ?? 4000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET": {
      get(res, url);

      break;
    }

    case "POST": {
      post(req, res, url);

      break;
    }

    case "PUT": {
      put(req, res, url);

      break;
    }

    case "DELETE": {
      remove(res, url);

      break;
    }

    default: {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "non existing resource" }));
      break;
    }
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
