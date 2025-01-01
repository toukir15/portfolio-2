import Image from 'next/image'
import React from 'react'
import vscode from "../../../public/vscode.svg"
import { getUser } from '@/src/services/user/query'

export default async function TopNavbar() {
    const { data } = await getUser()
    return (
        <header className="h-10 bg-[#1F2428] border-b border-[#131618] flex items-center justify-between px-4 w-full">
            <div className='flex gap-3'>
                <div className='w-4 h-4'>
                    <Image height={20} width={20} alt='vs' src={vscode} />
                </div>
                <p className="text-sm font-medium">File</p>
                <p className="text-sm font-medium">Edit</p>
                <p className="text-sm font-medium">View</p>
                <p className="text-sm font-medium">Go</p>
                <p className="text-sm font-medium">Run</p>
                <p className="text-sm font-medium">Help</p>
            </div>
            <div className='text-sm hidden lg:block'>
                {data.name} - Visual Studio Code
            </div>
            <div className='hidden lg:block'>
                <div className='flex gap-[6px] '>
                    <div className='h-3 w-3 rounded-full bg-[#F1FA8C]'></div>
                    <div className='h-3 w-3 rounded-full bg-green-500'></div>
                    <div className='h-3 w-3 rounded-full bg-red-500'></div>
                </div>
            </div>
        </header>
    )
}
