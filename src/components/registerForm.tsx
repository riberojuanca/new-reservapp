"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setIsSubmitting(true);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
      <form
        className="w-full max-w-sm p-4 space-y-2 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign Up
        </h2>

        <div className="space-y-2 flex flex-col ">
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
        </div>

        <div className="space-y-2 flex flex-col ">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
        </div>

        <div className="space-y-2 flex flex-col ">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
        </div>

        <div className="space-y-2 flex flex-col ">
          <label htmlFor="confirmPassword" className="text-white">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
            placeholder="Confirm your password"
            {...register("confirmPassword", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-md text-white border border-white border-opacity-20 hover:bg-opacity-70 transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
