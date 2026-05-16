import { http, HttpResponse } from "msw";

import userService from "@/services/userService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockUsers, mockUser } from "@tests/__mocks__/users.mock";

describe("userService", () => {
  describe("getAll", () => {
    it("should return all users on success", async () => {
      const result = await userService.getAll();

      expect(result).toEqual(mockUsers);
    });

    it("should throw an error when response is not ok", async () => {
      mockMswServer.use(http.get("/users", () => new HttpResponse(null, { status: 404 })));

      await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw an error with correct status on server error", async () => {
      mockMswServer.use(http.get("/users", () => new HttpResponse(null, { status: 500 })));

      await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });

    it("should throw an error on network failure", async () => {
      mockMswServer.use(http.get("/users", () => HttpResponse.error()));

      await expect(userService.getAll()).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a single user on success", async () => {
      const result = await userService.getById(1);

      expect(result).toEqual(mockUser);
    });

    it("should throw an error when response is not ok", async () => {
      mockMswServer.use(http.get("/users/:id", () => new HttpResponse(null, { status: 404 })));

      await expect(userService.getById(1)).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw an error on network failure", async () => {
      mockMswServer.use(http.get("/users/:id", () => HttpResponse.error()));

      await expect(userService.getById(1)).rejects.toThrow();
    });
  });
});
