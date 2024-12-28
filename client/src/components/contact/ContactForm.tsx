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
        <>
            <div className="w-full md:w-1/2 md:pl-8 mt-8 md:mt-0 overflow-hidden">
                <h2 className="text-2xl font-bold mb-6">Or Fill Out This Form</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full p-3 bg-[#24292E] rounded focus:outline-none focus:ring-2 focus:ring-[#F9826C]"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                                className="w-full p-3 bg-[#24292E] rounded focus:outline-none focus:ring-2 focus:ring-[#F9826C]"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Subject"
                            {...register("subject", { required: "Subject is required" })}
                            className="w-full p-3 bg-[#24292E] rounded focus:outline-none focus:ring-2 focus:ring-[#F9826C]"
                        />
                        {errors.subject && (
                            <p className="text-red-500 text-sm">{errors.subject.message}</p>
                        )}
                    </div>
                    <div>
                        <textarea
                            placeholder="Message"
                            rows={5}
                            {...register("text", { required: "Message is required" })}
                            className="w-full p-3 bg-[#24292E] rounded focus:outline-none focus:ring-2 focus:ring-[#F9826C]"
                        ></textarea>
                        {errors.text && (
                            <p className="text-red-500 text-sm">{errors.text.message}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="px-10 w-full md:w-fit py-2 bg-[#F9826C] text-white rounded font-bold hover:bg-[#d86a5c] transition"
                    >
                        SUBMIT
                    </Button>
                </form>
            </div>
        </>
    );
}
