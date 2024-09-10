"use client";

import { loginAction } from "@/actions/auth-action";
import { Inputs } from "@/types/InputsTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: Inputs) {
    setError(null);
    setLoading(true); // Inicia el estado de carga

    try {
      const response = await loginAction(data);
      if (!response.success) {
        setError(response.error || "An unknown error occurred");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unknown error occurred");
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  }

  return (
    <main className="h-screen flex justify-center items-center min-h-fit mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-1 min-w-80 w-1/6"
      >
        <h1 className="text-xl font-bold uppercase p-1">
          <span className="text-3xl grayscale">🔑</span> Login
        </h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          autoComplete="username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
        />
        {errors.username && (
          <span className="w-full flex justify-end text-xs text-orange-500">
            {errors.username.message}
          </span>
        )}
        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          autoComplete="new-password"
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

        {/* Submit button */}
        <button className="bg-orange-600 rounded-sm mt-3 p-3 uppercase font-bold text-stone-600 shadow-sm hover:shadow-md">
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
};

export default LoginForm;
