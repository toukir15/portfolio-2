"use client";
import { IUserProviderValues, UserContext } from "@/src/context/user.provider";
import React, { useContext } from "react";
import { FaDribbble, FaBehance, FaLinkedin, FaEdit } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiAdobexd,
} from "react-icons/si";

const ProfileView = () => {
  const userData = {
    name: "Toukir Ahmed",
    designation: "Full Stack Web Developer | UI/UX Enthusiast",
    profilePhoto:
      "https://res.cloudinary.com/dnbxtcqiw/image/upload/v1735351832/vblzqzzm",
    aboutMe:
      "As a passionate developer, I specialize in creating innovative and user-friendly web applications. My focus is on crafting responsive and dynamic solutions that meet the evolving needs of users and businesses.",
    skills: [
      { name: "React.js", icon: <SiReact className="text-blue-500" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      { name: "UI/UX Design", icon: <SiAdobexd className="text-pink-500" /> },
    ],
    socialLinks: {
      dribbble: "https://dribbble.com/",
      behance: "https://behance.net/",
      linkedin: "https://linkedin.com/",
    },
  };

  const { user } = useContext(UserContext) as IUserProviderValues;

  return (
    <div className="w-full bg-gray-100">
      {/* Profile Header */}
      <div className="w-full mx-auto bg-white rounded-lg shadow-sm p-8 relative">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-6">
          <div className="relative">
            <img
              src={user?.profilePhoto}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />
            <button className="absolute bottom-2 right-2 bg-indigo-500 text-white p-1 rounded-full shadow-lg hover:bg-indigo-600 focus:outline-none">
              <FaEdit className="text-sm" />
            </button>
          </div>
          <div className="mt-4 lg:mt-0 text-center space-y-2 lg:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-600">{user?.designation}</p>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="w-full mx-auto mt-6 bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
        <p className="text-gray-600 mt-4">{userData.aboutMe}</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">Skills</h3>
        <ul className="mt-4 grid grid-cols-2 gap-4 text-gray-600">
          {userData.skills.map((skill, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="text-xl">{skill.icon}</div>
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileView;
