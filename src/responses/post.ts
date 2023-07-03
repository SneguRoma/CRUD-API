import { ServerResponse, IncomingMessage } from "http";
import { users } from "..";
import { User } from "..";
import { v4 as uuidv4 } from 'uuid';
import { nonExRes, reqFields, servErr } from "./constants";

export const post = (req: IncomingMessage, res: ServerResponse, url?: string) => {
  if (url === '/api/users') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });
    
      req.on('end', () => {
        try {
          const { username, age, hobbies } = JSON.parse(body);


        if (!username || !age || !hobbies) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: reqFields }));
        } else {
          const newUser: User = {
            id: uuidv4(),
            username,
            age,
            hobbies,
          };

          users.push(newUser);

          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(newUser));
          }
        } catch {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: servErr }));
    }
      });

    
    
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: nonExRes }));
  }

};
