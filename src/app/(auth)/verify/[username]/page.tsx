"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "@/components/Logo";

const VerifyAccount = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "", // Ensure the input has a default value
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: param.username,
        code: data.code,
      });

      toast({
        title: "Verification Success",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      console.error("Signup failed");
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: errorMessage || "An error occurred",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-gray-950">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-cyan-800/40 shadow-lg shadow-cyan-900/20">
        <div className="text-center">
          <Logo size="lg" />
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-6 text-cyan-300">
            Identity Verification
          </h1>
          <p className="mb-4 text-cyan-100">
            Enter the verification code sent to your comms
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-300">
                    Verification Code
                  </FormLabel>
                  <Input placeholder="Enter your code" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="cyberpunk"
              type="submit"
              className="w-full"
            >
              Validate Identity
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
