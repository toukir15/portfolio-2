"use client"
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

export default function TypewriterComponent({ designation }: { designation: string }) {
    return (
        <Typewriter
            words={[designation]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={150}
            delaySpeed={1000}
        />
    )
}
