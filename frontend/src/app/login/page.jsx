"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password is too short"),
});

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle session redirect
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const onSubmit = async (values) => {
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        let errorMessage = "Invalid credentials";
        
        // Handle both JSON and string errors
        if (res.error.startsWith("{")) {
          try {
            const errorData = JSON.parse(res.error);
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        } else {
          errorMessage =
          //  res.error === "CredentialsSignin"
          //   ? 
            "Invalid email or password"
            // : res.error;
        }

        setErrorMsg(errorMessage);
        toast.error(errorMessage);
      } else if (res?.ok) {
        router.push("/dashboard");
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Connection problem. Please try again.");
      toast.error("Network error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ToastContainer />
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="admin@gmail.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMsg && (
                <p className="text-sm text-red-500 text-center">{errorMsg}</p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
