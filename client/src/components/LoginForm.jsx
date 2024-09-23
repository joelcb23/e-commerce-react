import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const { loginAuth, isAuthenticated } = useAuth();
  const { register, handleSubmit, reset } = useForm();
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
      <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="email@example.com"
          className="input"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="Password"
          className="input"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 mt-4"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
