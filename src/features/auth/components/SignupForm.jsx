import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import { signupSchema } from "../validation/signupSchema";
import authApi from "../services/authApi";
import { getApiErrorMessage } from "../../../services/apiError";

const formDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignupForm() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: formDefaultValues,
  });

  async function onSubmit(data) {
    setServerError("");
    setSuccessMessage("");

    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const result = await authApi.signup(formData);

      console.log("Signup successful:", result);

      setSuccessMessage("Account created successfully");

      navigate("/login", { replace: true });
    } catch (error) {
      setServerError(getApiErrorMessage(error));
    }
  }

  return (
    <div className="card shadow">
      {/* Server Error */}
      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverError}
        </div>
      )}

      {/* Server Success */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="card-body p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="form-floating mb-3">
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First Name"
              {...register("firstName")}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />

            <label htmlFor="firstName">First Name</label>

            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="form-floating mb-3">
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last Name"
              {...register("lastName")}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />

            <label htmlFor="lastName">Last Name</label>

            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />

            <label htmlFor="email">Email</label>

            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-floating mb-3">
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />

            <label htmlFor="password">Password</label>

            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-floating mb-3">
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>

            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>

        <p className="text-muted mt-3">
          Already have an account{" "}
          <Link to="/login" className="link-underline-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
