"use client";

import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import Logo from "@/components/common/Logo";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is Required.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(1, {
      message: "Password is required.",
    }),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    window.location.href = "/dashboard";
  };

  const action: () => void = form.handleSubmit(onSubmit);

  return (
    <div className="flex flex-col gap-6 lg:gap-[30px] 2xl:gap-10 items-center w-full max-lg:h-full lg:w-[29%] px-4 lg:px-[30px] 2xl:px-10 max-lg:rounded-t-[20px] max-lg:-mt-14 max-lg:pb-7 max-lg:bg-white max-lg:pt-8">
      <div className="flex flex-col items-center gap-2 lg:gap-3 2xl:gap-5">
        <Logo />
        <h1 className="text-black font-semibold text-base lg:text-lg 2xl:text-2xl">
          Sign In
        </h1>
      </div>
      <Form {...form}>
        <form
          action={action}
          className="flex flex-col h-full w-full gap-10 lg:gap-16 2xl:gap-20"
        >
          <div className="flex flex-col gap-2.5 2xl:gap-3.5">
            <div className="flex flex-col gap-[18px] 2xl:gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        className="font-normal text-black text-xs 2xl:text-base placeholder:text-black placeholder:text-xs 2xl:placeholder:text-base p-4 2xl:p-5 rounded-2xl 2xl:rounded-3xl w-full h-11 2xl:h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="font-normal text-black text-xs 2xl:text-base placeholder:text-black placeholder:text-xs 2xl:placeholder:text-base p-4 2xl:p-5 rounded-2xl 2xl:rounded-3xl w-full h-11 2xl:h-14"
                      />
                      {!showPassword ? (
                        <EyeOff
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-300 size-5 2xl:size-6 absolute right-4 2xl:right-6 top-1/2 -translate-y-1/2 shrink-0 cursor-pointer"
                        />
                      ) : (
                        <Eye
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-300 size-5 2xl:size-6 absolute right-4 2xl:right-6 top-1/2 -translate-y-1/2 shrink-0 cursor-pointer"
                        />
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center justify-between gap-1.5 3xl:gap-2">
              <div className="flex flex-row items-center justify-center gap-2.5 3xl:gap-3.5">
                <Checkbox
                  id="remember"
                  className="size-4 2xl:size-5 data-[state=checked]:bg-gray-600 data-[state=checked]:border-none cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-xs 2xl:text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                >
                  Remember Password
                </label>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-2xl 2xl:rounded-3xl font-semibold text-base 2xl:text-xl h-10 2xl:h-14 bg-black text-white"
          >
            {form.formState.isSubmitting ? (
              <Loader2Icon className="size-6 2xl:size-8 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
