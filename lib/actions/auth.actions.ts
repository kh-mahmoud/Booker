"use server";

import { hash } from "bcryptjs";
import { getUser } from "./user.actions";
import { prisma } from "../database/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";


export const signInWitCredentiales = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get('x-forwarded-for') || (await headers()).get('x-real-ip') || (await headers()).get('client-ip') || (await headers()).get('cf-connecting-ip') || "127.0.0.1";
  const result = await ratelimit.limit(ip);

  if (!result.success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const SignUp = async (params: AuthCredentials) => {
  //get ip adress and limit the request coming from it

  const ip = (await headers()).get('x-forwarded-for') || (await headers()).get('x-real-ip') || (await headers()).get('client-ip') || (await headers()).get('cf-connecting-ip') || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const { name, email, universityId, universityCard, password } = params;

  //check if the user exist
  const user = await getUser(email);

  if (user) {
    return { success: false, error: "user already exist" };
  }

  const hashedPasword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        universityId,
        universityCard,
        password: hashedPasword,
      },
    });

    await signInWitCredentiales({ email, password });

    await workflowClient.trigger({
      url: `${config.env.apiEndpoint}/api/workflows/onboarding`,
      body:{
        email,
        name
      }
    })

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "signUp error" };
  } finally {
    await prisma.$disconnect();
  }
};
