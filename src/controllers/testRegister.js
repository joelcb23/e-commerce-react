import request from "supertest";
import app from "../../index.js"; // assuming the app is defined in a separate file
import { register } from "./auth.controller.js";

describe("Register endpoint", () => {
  it("should return 400 if required fields are missing", async () => {
    const req = { body: { email: "test@example.com" } };
    const res = { status: jest.fn(), json: jest.fn() };
    await register(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  it("should return 400 if user already exists", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "test@example.com",
        password: "password",
        role: "user",
      },
    };
    const res = { status: jest.fn(), json: jest.fn() };
    const userExists = { id: 1, email: "test@example.com" };
    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(userExists);
    await register(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
  });

  it("should create a new user and return 201", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "test@example.com",
        password: "password",
        role: "user",
      },
    };
    const res = { status: jest.fn(), json: jest.fn(), setHeader: jest.fn() };
    const user = {
      id: 1,
      name: "John Doe",
      email: "test@example.com",
      role: "user",
    };
    jest.spyOn(prisma.user, "create").mockResolvedValue(user);
    await register(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ user });
    expect(res.setHeader).toHaveBeenCalledTimes(1);
    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      expect.any(String)
    );
  });

  it("should return 500 if an error occurs", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "test@example.com",
        password: "password",
        role: "user",
      },
    };
    const res = { status: jest.fn(), json: jest.fn() };
    jest
      .spyOn(prisma.user, "create")
      .mockRejectedValue(new Error("Test error"));
    await register(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: "Test error" });
  });
});
