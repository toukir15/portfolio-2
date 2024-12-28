import React from 'react'

export default function TopNavbar() {
    return (
        <header className="h-10 bg-[#1F2428] border-b border-[#131618] flex items-center px-4 w-full">
            <p className="text-sm font-medium">File</p>
            <p className="text-sm font-medium ml-4">Edit</p>
            <p className="text-sm font-medium ml-4">View</p>
            <p className="text-sm font-medium ml-4">Go</p>
            <p className="text-sm font-medium ml-4">Run</p>
            <p className="text-sm font-medium ml-4">Help</p>
        </header>
    )
}
