"use client";

import { registerAction, AuthResponse } from "@/actions/auth.action";
import { Inputs } from "@/types/InputsTypes";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: Inputs) {
    setError(null);
    startTransition(async () => {
      const response: AuthResponse = await registerAction(data);
      if (!response.success) {
        setError(response.error || "An unknown error occurred");
      } else {
        router.push("/login");
      }
    });
  }

  return (
    <main className="h-screen flex justify-center items-center min-h-fit mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-1 min-w-80 w-1/6"
      >
        <h1 className="text-xl font-bold uppercase p-1">
          <span className="text-3xl grayscale">🔐</span> Register
        </h1>
        {/* Inputs y manejo de errores */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "Name is required" },
          })}
        />
        {errors.name && (
          <span className="w-full flex justify-end text-xs text-orange-500">
            {errors.name.message}
          </span>
        )}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
        />
        {errors.username && (
          <span className="w-full flex justify-end text-xs text-orange-500">
            {errors.username.message}
          </span>
        )}

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
        />
        {errors.email && (
          <span className="w-full flex justify-end text-xs text-orange-500">
            {errors.email.message}
          </span>
        )}

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors.password && (
          <span className="w-full flex justify-end text-xs text-orange-500">
            {errors.password.message}
          </span>
        )}

        {/* Confirm Password */}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Please, need confirm password",
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="w-full flex justify-end text-xs text-orange-500">
            {errors.confirmPassword.message}
          </span>
        )}
        {/* Submit button */}
        <button className="bg-orange-600 rounded-sm mt-3 p-3 uppercase font-bold text-stone-600 shadow-sm hover:shadow-md">
          {isPending ? "Registering..." : "Register"}
        </button>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
};

export default FormRegister;
