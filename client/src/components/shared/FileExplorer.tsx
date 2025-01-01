"use client"
import React, { useState } from 'react'
import reactIcon from "../../../public/images/react.png"
import html from "../../../public/images/html.png"
import css from "../../../public/images/css.png"
import json from "../../../public/images/json.png"
import javascript from "../../../public/images/js.png"
import typescript from "../../../public/images/typescript.png"
import { GrFormNext } from "react-icons/gr";
import Image from 'next/image'
import Link from 'next/link'

export default function FileExplorer() {
    const [isToggle, setIsToggle] = useState(true)
    return (
        <section className="w-40 lg:w-64 py-2">
            <p className="text-md text-gray-400 px-3">EXPLORER</p>
            <p onClick={() => setIsToggle(!isToggle)} className="text-sm flex items-center text-gray-400 mt-3">
                <span className={`${isToggle ? "rotate-90" : ""} transition duration-200 px-2 `}><GrFormNext className='text-[22px]' /></span>
                <span>PORTFOLIO</span>
            </p>
            {isToggle && <div className="">
                <Link href={"/"} className="text-sm py-1 flex items-center hover:bg-[#24292E] px-4">
                    <Image src={reactIcon} alt="Home" className="w-4 h-4 mr-2" />
                    Home.tsx
                </Link>
                <Link href={"/about"} className="text-sm py-1 flex items-center hover:bg-[#24292E] px-4">
                    <Image src={html} alt="About" className="w-4 h-4 mr-2" />
                    About.html
                </Link>
                <Link href={"/projects"} className="text-sm py-1 flex items-center hover:bg-[#24292E] px-4">
                    <Image src={javascript} alt="About" className="w-4 h-4 mr-2" />
                    Projects.js
                </Link>
                <Link href={"/skill"} className="text-sm py-1 flex items-center hover:bg-[#24292E] px-4">
                    <Image src={json} alt="skill" className="w-4 h-4 mr-2" />
                    Skill.json
                </Link>
                <Link href={"/contact"} className="text-sm py-1 flex items-center hover:bg-[#24292E] px-4">
                    <Image src={css} alt="About" className="w-4 h-4 mr-2" />
                    Contact.css
                </Link>
                <Link href={"/blog  "} className="text-sm py-1 flex items-center hover:bg-[#24292E] px-4">
                    <Image src={typescript} alt="About" className="w-4 h-4 mr-2" />
                    Blog.ts
                </Link>
            </div>}
        </section>
    )
}
