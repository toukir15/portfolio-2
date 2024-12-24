"use client";

import Link from "next/link";

export default function About() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-[#1F1F1F] to-[#2D2D2D] px-16 py-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-[#F9826C] mb-4">About Me</h1>
                <p className="text-lg leading-relaxed text-gray-300">
                    Hello! My name is <span className="font-semibold text-white">Toukir Ahmed</span>, and I am a passionate Full Stack Web Developer with a knack for creating dynamic and user-friendly web experiences. 🚀
                </p>
                <p className="text-lg leading-relaxed text-gray-300 mt-4">
                    With years of experience in web development, I have honed my skills in designing and building modern, scalable, and responsive applications. My expertise spans a wide range of technologies, including React, Node.js, Express, and MongoDB. From crafting visually appealing UIs to building robust backends, I strive to deliver solutions that meet the needs of both users and businesses.
                </p>
                <p className="text-lg leading-relaxed text-gray-300 mt-4">
                    My journey into development started with curiosity and a desire to solve problems. Over the years, I’ve worked on diverse projects, from small business websites to complex web applications, each enhancing my knowledge and skills. I enjoy collaborating with teams, exploring new technologies, and constantly pushing the boundaries of what's possible on the web.
                </p>
                <h2 className="text-3xl font-bold text-[#F9826C] mt-8">My Vision</h2>
                <p className="text-lg leading-relaxed text-gray-300 mt-4">
                    My goal is to empower businesses and individuals through technology. I believe that great design and functional development can transform ideas into impactful digital solutions. Whether it's building a startup's online presence or enhancing an existing platform, I aim to deliver value through innovation and precision.
                </p>
                <h2 className="text-3xl font-bold text-[#F9826C] mt-8">Beyond Coding</h2>
                <p className="text-lg leading-relaxed text-gray-300 mt-4">
                    When I'm not coding, I enjoy exploring new tech trends, blogging about development tips, and sharing knowledge with the developer community. I also have a passion for photography and love capturing moments that inspire creativity. 🌟
                </p>
                <div className="flex justify-center gap-6 mt-12">
                    <Link href="/portfolio" className="px-6 py-3 bg-[#F9826C] text-white text-lg font-semibold rounded-md hover:bg-[#e8715b]">
                        View My Work
                    </Link>
                    <Link href="/contact" className="px-6 py-3 border-2 border-[#F9826C] text-[#F9826C] text-lg font-semibold rounded-md hover:bg-[#F9826C] hover:text-white">
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    );
}
