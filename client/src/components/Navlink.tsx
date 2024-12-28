"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navlink() {
    const pathname = usePathname();

    return (
        <div className="bg-[#1F2428] overflow-x-auto">
            <div className="inline-flex w-max">
                <Link
                    className={`inline-block px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/"}
                >
                    Home.tsx
                </Link>
                <Link
                    className={`inline-block px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/about' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/about"}
                >
                    About.html
                </Link>
                <Link
                    className={`inline-block px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/contact' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/contact"}
                >
                    Contact.css
                </Link>
                <Link
                    className={`inline-block px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/projects' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/projects"}
                >
                    Projects.js
                </Link>
                <Link
                    className={`inline-block px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/blog' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/blog"}
                >
                    Blog.ts
                </Link>
            </div>
        </div>
    );
}
