"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { z, ZodTypeAny } from "zod";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn_schema, signUp_schema } from "@/lib/validations";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { signInWitCredentiales, SignUp } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

type AuthFormProps<T extends ZodTypeAny> = {
  type: "SIGN-UP" | "SIGN-In";
  defaultValues: DefaultValues<z.infer<T>>;
};

const AuthForm = <T extends ZodTypeAny>({
  type,
  defaultValues,
}: AuthFormProps<T>) => {
  // ✅ Use inferred type from schema
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(type == "SIGN-In" ? signIn_schema : signUp_schema),
    defaultValues,
  });

  const isSignIn = type === "SIGN-In";
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  async function onSubmit(values: z.infer<T>) {
    let result;
    setLoading(true);

    if (isSignIn) {
      result = await signInWitCredentiales({
        email: values.email.toString(),
        password: values.password.toString(),
      });

    } else {
      result = await SignUp(values);
    }

    if(result.success) router.push("/")

    if (isSignIn && result?.error) {
      toast.error(result.error, {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      setLoading(false);
    } 
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-semibold text-white">
        {isSignIn ? "Welcome back to BookStore" : "Create your library account"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<z.infer<T>>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name]}
                  </FormLabel>
                  <FormControl>
                    {field.name == "universityCard" ? (
                      <FileUpload onchange={field.onChange} folder="cards" type="image" />
                    ) : (
                      <Input
                        className="form-input"
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button disabled={loading} className="form-btn" type="submit">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>


      <p className={"text-center text-base font-medium"}>
        {isSignIn ? "New to BookStore ?" : "Already have an account ?"}
        &nbsp;
        <Link
          className="hover:underline font-bold text-primary"
          href={isSignIn ? "/sign-up" : "sign-in"}
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
