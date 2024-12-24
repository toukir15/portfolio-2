import React from 'react'
import { CiMail } from 'react-icons/ci'
import { IoCodeSlashOutline } from 'react-icons/io5'
import { VscCopy, VscGithubAlt } from 'react-icons/vsc'

export default function Sidebar() {
    return (
        <aside className="w-16 bg-[#24292E] flex flex-col items-center py-4">
            <button className="mb-4">
                <VscCopy className="text-[26px]" />
            </button>
            <button className="mb-4">
                <VscGithubAlt className="text-[24px]" />
            </button>
            <button className="mb-4">
                <IoCodeSlashOutline className="text-[24px]" />
            </button>
            <button className="mb-4">
                <CiMail className="text-[24px]" />
            </button>
        </aside>
    )
}
