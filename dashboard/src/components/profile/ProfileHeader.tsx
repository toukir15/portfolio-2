// ProfileHeader.tsx
import React from "react";
import { FaEdit } from "react-icons/fa";

interface ProfileHeaderProps {
    profilePhoto: string;
    name: string;
    designation: string;
    description: string
    onEdit: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profilePhoto, name, designation, description, onEdit }) => (
    <div className="w-full mx-auto bg-white rounded-lg shadow-sm p-8 relative">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-6">
            <div className="relative">
                <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                />
                <button
                    onClick={onEdit}
                    className="absolute bottom-2 right-2 bg-indigo-500 text-white p-1 rounded-full shadow-lg hover:bg-indigo-600 focus:outline-none"
                >
                    <FaEdit className="text-sm" />
                </button>
            </div>
            <div className="mt-4 lg:mt-0 text-center space-y-2 lg:text-left">
                <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
                <div>
                    <p className="text-gray-600 text-medium font-medium">{designation}</p>
                    <p className="text-gray-500 w-1/2">{description}</p>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileHeader;
