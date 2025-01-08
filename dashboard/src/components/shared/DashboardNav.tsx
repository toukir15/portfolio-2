"use client";

import { IUserProviderValues, UserContext } from '@/src/context/user.provider';
import Image from 'next/image';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for useRouter
import { logout } from '@/src/services/auth';
import Link from 'next/link';

export default function DashboardNav() {
    const { user } = useContext(UserContext) as IUserProviderValues;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter(); // Initialize useRouter

    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Handle navigation for profile and logout
    const handleNavigation = () => {
        logout()
        setIsDropdownOpen(false);
        router.push('/login');
    };

    return (
        <div className="relative px-8">
            {user ? (
                <>
                    {/* Profile Picture */}
                    <Image
                        src={user.profilePhoto}
                        alt={`${user.name}'s profile photo`}
                        width={40}
                        height={30}
                        className="rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                    />

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-8 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                        >
                            <div className="py-1 font-medium flex flex-col">
                                <Link href={"/"}
                                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                >
                                    Profile
                                </Link>
                                <button
                                    className="px-4 py-2 text-start text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleNavigation()}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse">f</div>
            )}
        </div>
    );
}
