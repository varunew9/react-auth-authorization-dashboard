import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validation/loginSchema";
import authApi from "../services/authApi";
import { getApiErrorMessage } from "../../../services/apiError";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

const loginDefaultValues = { email: "", password: "" };

function LoginForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  async function onSubmit(credentials) {
    setServerError("");
    setSuccessMessage("");
    try {
      const result = await authApi.login(credentials);
      //   console.log("Login successful:", result);
      loginUser(result);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(getApiErrorMessage(error));
    }
  }
  return (
    <div className="card shadow">
      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="card-body p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="text"
              id="email"
              autoComplete="email"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
            />
            <label htmlFor="email">Email</label>
            {errors.email && (
              <div className="invalid-feedback">{errors.email?.message}</div>
            )}
          </div>

          {/* password */}

          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loging in..." : "Log In"}
            </button>
          </div>
        </form>
        <p className="text-muted mt-3">
          Already have an account{" "}
          <Link to={"/signup"} className="link-underline-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
