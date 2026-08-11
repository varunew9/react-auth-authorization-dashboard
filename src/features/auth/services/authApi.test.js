import { describe, expect, it, vi } from "vitest";
import apiClient from "../../../services/apiClient";
import { signup } from "./authApi";

vi.mock("../../../services/apiClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("authApi", () => {
  it("should successfully register a user", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
    };

    const mockResponse = {
      data: {
        accessToken: "mock-jwt-token",
        user: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      },
    };

    apiClient.post.mockResolvedValue(mockResponse);

    const result = await signup(userData);

    expect(apiClient.post).toHaveBeenCalledWith("/register", userData);

    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error when signup fails", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
    };

    const error = new Error("Signup failed");

    apiClient.post.mockRejectedValue(error);

    await expect(signup(userData)).rejects.toThrow("Signup failed");
  });
});
