import * as http from 'http';
import 'dotenv/config';
//import { v4 as uuidv4 } from 'uuid';
import { get } from './responses/get';
import { post } from './responses/post';
import { put } from './responses/put';
import { remove } from './responses/remove';

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
    case 'GET': {
      get(res, url);
      /* if (url === '/api/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
      } else if (url?.startsWith('/api/users/')) {
        const userId = url.split('/').pop();
        const user = users.find((u) => u.id === userId);

        if (!user) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'User not found' }));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(user));
        }
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'non existing resource' }));
      } */
      break;
    }

    case 'POST': {

      post(req, res, url);
     /*  if (url === '/api/users') {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          const { username, age, hobbies } = JSON.parse(body);

          if (!username || !age || !hobbies) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Name and email are required fields' }));
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
        });
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'non existing resource' }));
      } */
      break;
    }

    case 'PUT': {
      put(req, res, url);
      /* if (url?.startsWith('/api/users/')) {
        const userId = url.split('/').pop();

        let body = '';

        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          const { username, age, hobbies } = JSON.parse(body);

          if (!username || !age || !hobbies) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Name and email are required fields' }));
          } else {
            const user = users.find((u) => u.id === userId);

            if (!user) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'User not found' }));
            } else {
              user.username = username;
              user.age = age;
              user.hobbies = hobbies;

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(user));
            }
          }
        });
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'non existing resource' }));
      } */
      break;
    }

    case 'DELETE': {
      remove(res, url);
      /* if (url?.startsWith('/api/users/')) {
        const userId = url.split('/').pop();
        const userIndex = users.findIndex((u) => u.id === userId);

        if (userIndex === -1) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'User not found' }));
        } else {
          users.splice(userIndex, 1);

          res.statusCode = 204;
          res.end();
        }
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'non existing resource' }));
      } */
      break;
    }

    default: {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'non existing resource' }));
      break;
    }
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
