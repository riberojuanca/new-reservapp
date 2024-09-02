"use server";
import prisma from "@/lib/db";
import { Inputs } from "@/types/InputsTypes";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { User } from "@/types/UserTypes";
import { signIn } from "@/auth";

export type AuthResponse =
  | { success: true; user: User }
  | { success: false; error: string };

export const loginAction = async (data: Inputs) => {
  try {
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (result.error) {
      return { error: result.error };
    }
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

//-----------------------------------------------------------------------------------------------
export const registerAction = async (data: Inputs): Promise<AuthResponse> => {
  if (!data) {
    return {
      success: false,
      error: "Invalid Data",
    };
  }
  try {
    //Encontramos el user
    const username = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    //Si el username ya está registrado (user ya existe)
    if (username) {
      return { success: false, error: "Username already exists" };
    }

    //Encontramos el Email
    const email = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    //Si el email ya está registrado (user ya existe)
    if (email) {
      return { success: false, error: "Email already registered" };
    }

    if (data.password !== data.confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    //Hasheamos el password
    const hashPassword = await bcrypt.hash(data.password, 10);
    console.log(hashPassword);

    //Creamos el nuevo usuario usando los datos
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return { success: true, user };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: error.cause?.err?.message || "An unexpected error occurred",
      };
    }
    return { success: false, error: "error 500" };
  }
};
