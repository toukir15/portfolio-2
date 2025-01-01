"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import authimg from "../../../public/auth.png";
import { Button, Input } from "@nextui-org/react";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: handleLogin, isError, isSuccess } = useUserLogin();

    const onSubmit = (data: LoginFormInputs) => {
        setIsLoading(true);
        handleLogin(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Logged in", { duration: 2000 });
            router.push("/");
            reset();
        }

        if (isError) {
            toast.error("Failed to log in", { duration: 2000 });
        }
        setIsLoading(false);
    }, [isSuccess, isError]);

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full">
            {/* Left Side */}
            <div className="flex w-full h-screen lg:w-1/2 items-center justify-center px-8 lg:px-20 py-10 lg:py-0">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl text-gray-900 font-bold ">
                            Sign in
                        </h1>
                        <p className="mt-2 text-gray-600 ">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-blue-500 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                radius="sm"
                                label="Email"
                                size="sm"
                                isInvalid={!!errors.email}
                                errorMessage={errors.email?.message}
                            />
                        </div>
                        <div>
                            <Input
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                radius="sm"
                                label="Password"
                                size="sm"
                                isInvalid={!!errors.password}
                                errorMessage={errors.password?.message}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <a
                                href="/forgot-password"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <Button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            isDisabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-950 to-gray-900 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">
                        Welcome to Toukir Dashboard
                    </h2>
                    <p className="text-gray-300 text-base lg:text-lg mb-8 px-4 lg:px-10">
                        A dashboard for managing portfolio content enables quick updates to
                        projects, blogs, and skills without coding, keeping the portfolio dynamic and up-to-date.
                    </p>
                    <Image
                        src={authimg}
                        alt="Authentication Illustration"
                        width={300}
                        height={300}
                        className="mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}
