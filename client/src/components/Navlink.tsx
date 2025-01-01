"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import reactIcon from "../../public/images/react.png"
import html from "../../public/images/html.png"
import css from "../../public/images/css.png"
import json from "../../public/images/json.png"
import javascript from "../../public/images/js.png"
import typescript from "../../public/images/typescript.png"

export default function Navlink() {
    const pathname = usePathname();

    return (
        <div className="bg-[#1F2428] overflow-x-auto">
            <div className="inline-flex w-max">
                <Link
                    className={` flex items-center px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/"}
                >
                    <Image src={reactIcon} alt="Home" className="w-4 h-4 mr-2" />
                    <p>Home.tsx</p>
                </Link>
                <Link
                    className={`flex items-center px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/about' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/about"}
                >
                    <Image src={html} alt="Home" className="w-4 h-4 mr-2" />
                    <p>About.html</p>
                </Link>
                <Link
                    className={`flex items-center px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/projects' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/projects"}
                >
                    <Image src={javascript} alt="Home" className="w-4 h-4 mr-2" />
                    <p>Projects.js</p>
                </Link>
                <Link
                    className={`flex items-center px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/skill' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/skill"}
                >
                    <Image src={json} alt="Home" className="w-4 h-4 mr-2" />
                    <p>Skill.json</p>
                </Link>
                <Link
                    className={`flex items-center px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/contact' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/contact"}
                >
                    <Image src={css} alt="Home" className="w-4 h-4 mr-2" />
                    <p>Contact.css</p>

                </Link>
                <Link
                    className={`flex items-center px-3 border-b py-2 border-r border-r-[#2e343a] ${pathname === '/blog' ? 'border-b-[#F9826C] text-[#F9826C]' : 'border-b-transparent text-white'
                        }`}
                    href={"/blog"}
                >
                    <Image src={typescript} alt="Home" className="w-4 h-4 mr-2" />
                    <p> Blog.ts</p>

                </Link>
            </div>
        </div>
    );
}
