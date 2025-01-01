import { getBlogs } from "@/src/services/blog/query";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: {
        default: "Toukir Ahmed  | Blog",
        template: ``,
    },
    description: "",
    icons: {
        icon: "/vscode.svg",
    },
};

export default async function BlogPosts() {
    const { data } = await getBlogs()
    return (
        <section className="py-8 md:py-16 min-h-[calc(100vh-100px)] bg-[#282828] text-gray-200 font-mono">
            <div className="container mx-auto px-4 max-w-7xl">
                <h1 className="text-3xl font-bold md:text-center text-[rgb(249,130,108)] mb-5 md:mb-10">
                    📝 Blog Posts
                </h1>
                <p className="text-lg md:text-center mb-6 md:mb-12 leading-relaxed">
                    Dive into our latest blogs, featuring insights, tips, and guides on various topics. Stay informed and inspired! 📚
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {data.map((post: any) => (
                        <div
                            key={post.id}
                            className="bg-[#2c3238] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover w-full h-full transition-all duration-300"
                                    width={400}
                                    height={300}
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-[rgb(249,130,108)] mb-2">
                                    {post.title}
                                </h2>
                                <div
                                    className="text-gray-300 mb-4 line-clamp-3 text-md"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                ></div>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/blog/${post._id}`}
                                        className="text-[rgb(249,130,108)] hover:underline"
                                    >
                                        Read More →
                                    </Link>
                                    <span className="text-sm text-gray-400">
                                        {post.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
