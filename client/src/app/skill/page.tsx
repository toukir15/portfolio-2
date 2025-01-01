import { getSkills } from "@/src/services/skill/query";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: {
        default: "Toukir Ahmed  | Skill",
        template: ``,
    },
    description: "",
    icons: {
        icon: "/vscode.svg",
    },
};

export default async function Page() {
    const { data } = await getSkills()

    const generateLineNumbers = () => {
        let lineNumber = 1;
        const lines: { number: number; content: string; indent?: number; image?: string }[] = [];

        // Line 1: Opening Technologies
        lines.push({ number: lineNumber++, content: ".Technologies {" });

        // Process each category
        Object.entries(data).forEach(([category, technologies]: any) => {
            // Category line
            lines.push({
                number: lineNumber++,
                content: `${category.charAt(0).toUpperCase() + category.slice(1)}: [`,
                indent: 1,
            });

            // Technology lines
            Object.entries(technologies).forEach(([key, { name, image }]: any) => {
                lines.push({
                    number: lineNumber++,
                    content: name,
                    image: image,
                    indent: 2,
                });
            });

            // Closing bracket for category
            lines.push({
                number: lineNumber++,
                content: "]",
                indent: 1,
            });
        });

        // Closing brace
        lines.push({ number: lineNumber++, content: "}" });

        return lines;
    };

    const lines = generateLineNumbers();

    return (
        <div className="w-full overflow-x-auto bg-[#282828] p-10">
            <h2 className="text-2xl font-medium mb-4 md:mb-6 text-[#F9826C]">Technologies That I Know</h2>
            <div className="flex">
                <div className="text-lg space-y-1 font-mono">
                    {lines.map((line) => (
                        <div key={line.number} className="flex items-center whitespace-nowrap group">
                            <span className="w-12 text-gray-500 text-right pr-4 select-none">{line.number}</span>
                            <div className={`flex items-center ${line.indent ? `ml-14` : ""}`}>
                                {line.image ? (
                                    <>
                                        <img src={line.image} alt={line.content} className="w-5 h-5 ml-10 mr-2" />
                                        <span className="text-gray-400">:</span>
                                        <p className="text-lime-400 ml-2 hover:underline">{line.content};</p>
                                    </>
                                ) : (
                                    <span className={line.indent === 1 ? "" : "text-white"}>{line.content}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
