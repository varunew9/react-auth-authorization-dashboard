import { describe, expect, it } from "vitest";
import { signupSchema } from "./signupSchema";

describe("signupSchema", () => {
  it("Should validate correct signup data", () => {
    const validData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    };

    const result = signupSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject an invalid email", () => {
    const invalidData = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      password: "password123",
      confirmPassword: "password123",
    };

    const result = signupSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it("should reject when passwords do not match", () => {
    const invalidData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "different123",
    };

    const result = signupSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });
});
