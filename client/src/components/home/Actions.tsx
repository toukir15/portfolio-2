"use client"
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function Actions() {
    return (
        <div className="flex md:flex-row flex-col gap-4 mt-5 xl:mt-10">
            <Link href={"/projects"}>
                <Button
                    radius="none"
                    className="px-8 bg-[#F9826C] w-full md:w-fit text-white text-lg font-semibold hover:bg-[#e8715b]"
                >
                    View Work
                </Button>
            </Link>
            <Link href={"/contact"}>
                <Button
                    variant="bordered" className="px-8 border w-full md:w-fit text-lg font-semibold text-[#F9826C] border-[#F98262] rounded  transition"
                >
                    Contact Me
                </Button>
            </Link>
        </div>
    )
}
