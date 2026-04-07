import userService from "@/services/userService";

import { mockUser, mockUsers } from "@tests/__mocks__/users.mock";

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("userService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should fetch all users successfully", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsers),
      } as unknown as Response);

      const users = await userService.getAll();

      expect(fetch).toHaveBeenCalledWith("/users");
      expect(users).toEqual(mockUsers);
    });

    it("should throw an error when response is not ok", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw an error with the correct status code", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });

    it("should call fetch exactly once", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsers),
      } as unknown as Response);

      await userService.getAll();

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("getById", () => {
    it("should fetch a user by id successfully", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      } as unknown as Response);

      const user = await userService.getById(1);

      expect(fetch).toHaveBeenCalledWith("/users/1");
      expect(user).toEqual(mockUser);
    });

    it("should throw an error when response is not ok", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(userService.getById(1)).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw an error with the correct status code", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(userService.getById(1)).rejects.toThrow("HTTP error! status: 500");
    });

    it("should call fetch with the correct user id in the url", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      } as unknown as Response);

      await userService.getById(42);

      expect(fetch).toHaveBeenCalledWith("/users/42");
    });

    it("should call fetch exactly once", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      } as unknown as Response);

      await userService.getById(1);

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
