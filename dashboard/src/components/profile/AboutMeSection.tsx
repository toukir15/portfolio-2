"use client";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { useEditProfile } from "@/src/hooks/auth.hook";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { IUserProviderValues, UserContext } from "@/src/context/user.provider";

const AboutMeSection = () => {
    const [decodedUser, setDecodedUser] = useState<{} | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAboutMe, setNewAboutMe] = useState("");
    const { mutate: handleEditProfile, isSuccess, isError, data } = useEditProfile();
    const { user } = useContext(UserContext) as IUserProviderValues;
    const profileData: any = useMemo(() => decodedUser ?? user, [decodedUser, user]);

    useEffect(() => {
        if (data?.accessToken) {
            const decodedData: any = jwtDecode(data?.accessToken);
            setDecodedUser({ ...user, about: decodedData.about });
        }
    }, [data?.accessToken]);

    const handleSave = (e: any) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("data", JSON.stringify({ about: newAboutMe }));
        handleEditProfile(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Profile about edited successfully!");
            setIsModalOpen(false);
        }
        if (isError) {
            toast.error("Error updating profile. Please try again.");
        }
    }, [isSuccess, isError]);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="w-full mx-auto mt-6 bg-white rounded-lg shadow-sm p-8">
            <div className="flex gap-2 items-center">
                <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-500 text-white p-1 rounded-full shadow-lg hover:bg-indigo-600 focus:outline-none"
                >
                    <FaEdit className="text-sm" />
                </button>
            </div>
            <p className="text-gray-600 mt-4" dangerouslySetInnerHTML={{ __html: profileData?.about }} />

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleOutsideClick}
                >
                    <form className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                            <IoClose className="text-lg" />
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Edit About Me</h3>
                        <JoditEditor
                            value={profileData?.about}
                            onBlur={(newContent) => {
                                if (typeof newContent === "string") {
                                    setNewAboutMe(newContent);
                                }
                            }}
                            config={{
                                readonly: false,
                                height: 300,
                            }}
                        />
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AboutMeSection;
