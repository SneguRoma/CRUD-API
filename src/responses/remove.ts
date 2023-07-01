import { ServerResponse } from "http";
import { users } from "..";

export const remove = (res: ServerResponse, url?: string) => {
  if (url?.startsWith('/api/users/')) {
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
  }
};
