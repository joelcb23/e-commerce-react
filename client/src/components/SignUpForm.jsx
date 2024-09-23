import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUpForm = () => {
  const { registerAuth, isAuthenticated } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    registerAuth(data);
    reset();
  });
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>

      <form onSubmit={onSubmit} className=" flex flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="Your Name"
          className="input"
        />
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
        <label htmlFor="role">User or Seller:</label>
        <select
          id="role"
          {...register("role", { required: true })}
          className="input"
        >
          <option value="USER">User</option>
          <option value="SELLER">Seller</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 mt-4"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
