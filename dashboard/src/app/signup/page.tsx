"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import authimg from "../../../public/auth.png";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useUserRegister } from "@/src/hooks/auth.hook";
import { toast } from "sonner";

interface LoginFormInputs {
    email: string;
    password: string;
    name: string;
    designation: string;
    description: string;
    address: string;
    image: FileList;
}

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: handleSignup, isSuccess, isError } = useUserRegister();

    const onSubmit = (data: LoginFormInputs) => {
        const formData = new FormData();
        const signupData = {
            name: data.name,
            email: data.email,
            designation: data.designation,
            description: data.description,
            address: data.address,
            password: data.password,
        };

        formData.append("data", JSON.stringify(signupData));
        formData.append("file", data.image[0]);
        setIsLoading(true);
        handleSignup(formData);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Successfully registered user!");
            reset();
            setImagePreview(null);
        }
        if (isError) {
            toast.error("Failed to register user.");
        }
        setIsLoading(false);
    }, [isSuccess, isError, reset]);

    return (
        <div className="flex h-screen w-full">
            {/* Left Side */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-10 md:px-20 h-screen overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <h1 className="text-3xl text-gray-900 font-bold">Sign in</h1>
                        <p className="mt-2 text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-500 hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                radius="sm"
                                label="Name"
                                size="sm"
                                className={errors.name ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <Input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                radius="sm"
                                label="Email"
                                size="sm"
                                className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <Input
                                {...register("address", { required: "Address is required" })}
                                type="text"
                                radius="sm"
                                label="Address"
                                size="sm"
                                className={errors.address ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                            )}
                        </div>
                        <div>
                            <Input
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                radius="sm"
                                label="Password"
                                size="sm"
                                className={errors.password ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        <div>
                            <Input
                                {...register("designation", { required: "Designation is required" })}
                                type="text"
                                radius="sm"
                                label="Designation"
                                size="sm"
                                className={errors.designation ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {errors.designation && (
                                <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
                            )}
                        </div>
                        <div>
                            <Textarea
                                {...register("description", { required: "Description is required" })}
                                label="Description"
                                className={errors.description ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                {...register("image", { required: "Image is required" })}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-indigo-600 file:text-gray-700 hover:file:border-indigo-700 cursor-pointer"
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                            )}
                            {imagePreview && (
                                <div className="mt-2">
                                    <Image
                                        src={imagePreview}
                                        alt="Image Preview"
                                        width={70}
                                        height={70}
                                        className="rounded"
                                    />
                                </div>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-md py-2 px-4 text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                        >
                            {isLoading ? "Submitting..." : "Sign in"}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right Side */}
            <div className=" w-1/2 bg-gradient-to-br from-blue-950 to-gray-900 flex hidden lg:block items-center justify-center">
                <div className="text-center">
                    <h2 className="text-white text-4xl font-bold mb-6">
                        Welcome to Toukir Dashboard
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 px-10">
                        A dashboard for managing portfolio content enables quick updates to
                        projects, blogs, and skills without coding, keeping the portfolio
                        dynamic and up-to-date.
                    </p>
                    <Image
                        src={authimg}
                        alt="Authentication Illustration"
                        width={400}
                        height={400}
                        className="mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}
