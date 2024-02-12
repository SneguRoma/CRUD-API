import request from "supertest";
import { server } from "..";
import {
  servErr,
  nonExRes,
  reqFields,
  notFoundUser,
} from "../responses/constants";

const baseUrl = "/api/users";
const app = request(server);

let userId: string;
const badURL = "/pofig";
const wrongJSON = '{ username: "leha" age: 210 hobbies: ["cars"] }';
const leha = { username: "leha", age: 210, hobbies: ["cars"] };
const wrongData = { username: "hanna", age: 20 };
const wrongUser = { username: "sasha", age: 23, email: "singer@" };

const testErr = (
  statusCode: number,
  errorCode: number,
  body: { message: string },
  errorMessage: string
) => {
  expect(statusCode).toBe(errorCode);
  expect(body.message).toBe(errorMessage);
};

afterAll(() => {
  server.close();
});

describe("check success responses", () => {
  it("Get all records with a GET api/users request", async () => {
    const { statusCode, body } = await app.get(baseUrl);

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(0);
  });

  it("A new object is created by a POST api/users request", async () => {
    const { statusCode, body } = await app.post(baseUrl).send(leha);

    expect(statusCode).toBe(201);
    expect(body.username).toBe("leha");
    expect(body.age).toBe(210);
    expect(body.hobbies).toEqual(["cars"]);
    expect(body.hobbies).toHaveLength(1);

    userId = body.id;
  });

  it("With a GET api/user/{userId} request, we try to get the created record by its id", async () => {
    const { statusCode, body } = await app.get(baseUrl + "/" + userId);

    expect(statusCode).toBe(200);
    expect(body.username).toBe("leha");
    expect(body.age).toBe(210);
    expect(body.hobbies).toEqual(["cars"]);
    expect(body.hobbies).toHaveLength(1);
  });

  it("Get all records with a GET api/users request", async () => {
    const { statusCode, body } = await app.get(baseUrl);

    expect(statusCode).toBe(200);
    expect(body[0].username).toBe("leha");
    expect(body[0].age).toBe(210);
    expect(body[0].hobbies).toEqual(["cars"]);
    expect(body).toHaveLength(1);
  });

  it("We try to update the created record with a PUT api/users/{userId}request", async () => {
    const { statusCode, body } = await app
      .put(baseUrl + "/" + userId)
      .send(leha);

    expect(statusCode).toBe(200);
    expect(body.username).toBe("leha");
    expect(body.age).toBe(210);
    expect(body.hobbies).toEqual(["cars"]);
    expect(body.hobbies).toHaveLength(1);
  });

  it("With a GET api/user/{userId} request, we try to get the created record by its id", async () => {
    const { statusCode, body } = await app.get(baseUrl + "/" + userId);

    expect(statusCode).toBe(200);
    expect(body.username).toBe("leha");
    expect(body.age).toBe(210);
    expect(body.hobbies).toEqual(["cars"]);
    expect(body.hobbies).toHaveLength(1);
  });

  it("With a DELETE api/users/{userId} request, we delete the created object by id", async () => {
    const { statusCode, body } = await app.delete(baseUrl + "/" + userId);

    expect(statusCode).toBe(204);
    expect(body).toBeUndefined;
  });

  it("With a GET api/users/{userId} request, we are trying to get a deleted object by id", async () => {
    const { statusCode, body } = await app.get(baseUrl + "/" + userId);

    testErr(statusCode, 404, body, notFoundUser ?? "");
  });
});

describe("check error 404 ", () => {
  it("bad GET request", async () => {
    const { statusCode, body } = await app.get(badURL);

    testErr(statusCode, 404, body, nonExRes ?? "");
  });

  it("bad POST request", async () => {
    const { statusCode, body } = await app.post(badURL).send(leha);

    testErr(statusCode, 404, body, nonExRes ?? "");
  });

  it("bad PUT request", async () => {
    const { statusCode, body } = await app.put(badURL).send(leha);

    testErr(statusCode, 404, body, nonExRes ?? "");
  });

  it("bad DELETE request", async () => {
    const { statusCode, body } = await app.delete(badURL);

    testErr(statusCode, 404, body, nonExRes ?? "");
  });
});

describe("check internal error 500", () => {
  it("bad json POST request", async () => {
    const { statusCode, body } = await app.post(baseUrl).send(wrongJSON);

    testErr(statusCode, 500, body, servErr ?? "");
  });

  it("bad json PUT request", async () => {
    const response = await app.post(baseUrl).send(leha);

    userId = response.body.id;

    const { statusCode, body } = await app
      .put(baseUrl + "/" + userId)
      .send(wrongJSON);

    testErr(statusCode, 500, body, servErr ?? "");
  });
});

describe("check error 400", () => {
  it("bad request body POST request", async () => {
    const { statusCode, body } = await app.post(baseUrl).send(wrongUser);

    testErr(statusCode, 400, body, reqFields ?? "");
  });

  it("bad request body PUT request", async () => {
    const response = await app.post(baseUrl).send(leha);

    userId = response.body.id;

    const { statusCode, body } = await app
      .put(baseUrl + "/" + userId)
      .send(wrongData);

    testErr(statusCode, 400, body, reqFields ?? "");
  });
});
