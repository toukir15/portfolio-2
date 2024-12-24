"use client";
import { Button } from "@nextui-org/react";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <section className="h-[calc(100vh-100px)] flex items-center bg-gradient-to-b from-[#1F1F1F] to-[#2D2D2D] px-16 text-white">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold leading-tight">
          Hi, I'm <span className="text-[#F9826C]">Toukir Ahmed</span>
        </h1>
        <h2 className="text-2xl mt-4 font-medium text-gray-300">
          <Typewriter
            words={["A Passionate Full Stack Web Developer 🚀"]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={150}
            delaySpeed={1000}
          />
        </h2>
        <p className="mt-6 text-lg text-gray-400">
          I specialize in creating modern, responsive, and dynamic web applications.
          With a keen eye for detail and a love for problem-solving, I turn ideas into reality.
        </p>
        <div className="flex gap-4 mt-10">
          <Button
            radius="none"
            className="px-8 bg-[#F9826C] text-white text-lg font-semibold hover:bg-[#e8715b]"
          >
            View Work
          </Button>
          <Button
            radius="none"
            variant="bordered"
            className="px-8 text-lg text-[#F9826C] border-[#F9826C] font-semibold hover:bg-[#F9826C] hover:text-white"
          >
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}
