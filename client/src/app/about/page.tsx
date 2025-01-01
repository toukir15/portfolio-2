
import { getUser } from "@/src/services/user/query";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: {
        default: "Toukir Ahmed  | About",
        template: ``,
    },
    description: "",
    icons: {
        icon: "/vscode.svg",
    },
};
export default async function About() {
    const { data } = await getUser()
    return (
        <section className="min-h-[calc(100vh-100px)] py-8 xl:py-16 bg-gradient-to-b from-[#1F1F1F] to-[#2D2D2D] text-gray-200 font-mono">
            <div className="container mx-auto px-4 max-w-7xl">
                <h1 className="text-2xl lg:text-3xl font-bold md:text-center text-[rgb(249,130,108)] mb-6 flex items-center justify-center">
                    {data.designation}
                </h1>
                <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: data?.about || "<p>No information available</p>",
                    }}
                />

            </div>
        </section>
    );
}
