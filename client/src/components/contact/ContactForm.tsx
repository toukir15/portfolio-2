"use client";
import { sendEmail } from "@/src/services/social/mutation";
import { Button } from "@nextui-org/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export type FormValues = {
    name: string;
    email: string;
    subject: string;
    text: string;
};

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await sendEmail(data);
            reset();
            toast.success("Email sent successfully!", { duration: 2000 });
        } catch (error: any) {
            toast.error(error.message, { duration: 2000 });
        }
    };

    return (
        <div className="w-full lg:w-1/2 mx-auto px-4 md:px-6 mt-8 md:mt-0 overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold mb-6 mt-0 md:mt-8 lg:mt-0 text-center">
                Or Fill Out This Form
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Name and Email */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-3 bg-[#24292E] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#F9826C]"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="w-full">
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            className="w-full p-3 bg-[#24292E] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#F9826C]"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <input
                        type="text"
                        placeholder="Subject"
                        {...register("subject", { required: "Subject is required" })}
                        className="w-full p-3 bg-[#24292E] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#F9826C]"
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <textarea
                        placeholder="Message"
                        rows={5}
                        {...register("text", { required: "Message is required" })}
                        className="w-full p-3 bg-[#24292E] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#F9826C]"
                    ></textarea>
                    {errors.text && (
                        <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full md:w-auto px-10 py-3 bg-[#F9826C] text-white rounded font-bold hover:bg-[#d86a5c] transition duration-200"
                >
                    SUBMIT
                </Button>
            </form>
        </div>
    );
}
