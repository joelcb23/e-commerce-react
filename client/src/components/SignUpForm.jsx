import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
      <h1 className="text-3xl font-bold text-center mb-10">Sign Up</h1>
      <p className="text-center mb-10 text-neutral-600">
        Welcome to our platform! Please fill out the form below to create an
        account.
      </p>

      <form onSubmit={onSubmit} className=" flex flex-col gap-5">
        <p>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Your Name"
            className="input"
          />
        </p>
        <p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="email@example.com"
            className="input"
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Password"
            className="input"
          />
        </p>
        <p>
          <label htmlFor="role">User or Seller:</label>
          <select
            id="role"
            {...register("role", { required: true })}
            className="input"
          >
            <option value="USER">User</option>
            <option value="SELLER">Seller</option>
          </select>
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-lg text-white rounded p-3 mt-5"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-neutral-600 my-5 md:my-10">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </>
  );
};

export default SignUpForm;
