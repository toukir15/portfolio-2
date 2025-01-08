import { getBlog } from "@/src/services/blog/query";
import dayjs from "dayjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: {
        default: "Toukir Ahmed  | BlogDetails",
        template: ``,
    },
    description: "",
    icons: {
        icon: "/vscode.svg",
    },
};

export default async function BlogDetails({ params }: any) {
    const { blogId } = params;
    const { data: blogPost } = await getBlog(blogId);

    const formattedDate = dayjs(blogPost.createdAt).format("D MMMM YYYY");

    return (
        <section className="py-8 md:py-16 bg-gradient-to-b min-h-[calc(100vh-100px)] bg-[#282828] text-gray-200 font-mono">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex justify-center items-center">
                    <div className="rounded-lg h-[400px] w-[400px] overflow-hidden mb-8">
                        <img
                            src={blogPost.image}
                            alt={blogPost.title}
                            className="w-full object-cover"
                        />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-[rgb(249,130,108)] mb-4">
                    {blogPost.title}
                </h1>

                <div className="flex items-center justify-between text-gray-400 text-sm mb-6">
                    <span>By {blogPost.author}</span>
                    <span>{formattedDate}</span>
                </div>

                <div className="mb-6">
                    {blogPost.category.map((c: string) => (
                        <span
                            key={c}
                            className="bg-gray-700 text-gray-300 text-xs uppercase font-semibold px-2 py-1 rounded-lg mr-2"
                        >
                            {c}
                        </span>
                    ))}
                </div>

                <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                ></div>
            </div>
        </section>
    );
}
