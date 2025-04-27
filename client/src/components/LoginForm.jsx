import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const { loginAuth, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    loginAuth(data);
    reset();
  });
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-10">Login</h1>
      <p className="text-center mb-10 text-neutral-600">
        Welcome back! Please fill out the form below to log in.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <p>
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Simple email regex pattern
                message: "Invalid email format",
              },
            })}
            placeholder="email@example.com"
            className="input"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </p>
        <p>
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            placeholder="Password"
            className="input"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-lg text-white rounded p-3 mt-5"
        >
          Login
        </button>
      </form>
      <p className="text-center my-5 md:my-10 text-neutral-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
