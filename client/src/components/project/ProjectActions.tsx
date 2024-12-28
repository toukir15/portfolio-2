"use client";
import { Button } from "@nextui-org/react";
import React from "react";

export default function ProjectActions({
    live,
    source,
}: {
    live: string;
    source: string;
}) {
    return (
        <div className="flex space-x-4">
            <a href={live} target="_blank" rel="noopener noreferrer">
                <Button className="text-white bg-[#F98262] px-4 py-2 rounded transition">
                    Live
                </Button>
            </a>
            <a href={source} target="_blank" rel="noopener noreferrer">
                <Button
                    variant="bordered"
                    className="text-white border border-[#F98262] px-4 py-2 rounded transition"
                >
                    Github
                </Button>
            </a>
        </div>
    );
}
