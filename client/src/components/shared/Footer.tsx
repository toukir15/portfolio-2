import React from "react";
import { IoIosGitBranch } from "react-icons/io";

export default function Footer() {
    return (
        <footer className="h-8 bg-[#1F2428] border-t border-[#131618] flex items-center px-4 text-sm ">
            {/* Left Section */}
            <div className="flex gap-2 items-center">
                {/* Branch and Status */}
                <div className="flex gap-1 items-center">
                    <IoIosGitBranch className="text-[16px]" />
                    <p>
                        main <span className="relative -left-[7px] -top-[3px]">*</span>
                    </p>
                </div>
                {/* Encoding */}
                <p>UTF-8</p>
                {/* Language */}
                <p className="ml-4">TypeScript JSX</p>
            </div>

            {/* Right Section */}
            <p className="ml-auto">Ln 10, Col 65</p>
        </footer>
    );
}
