// SkillsSection.tsx
import React from "react";
import { SiReact, SiNodedotjs, SiTypescript, SiTailwindcss, SiMongodb, SiAdobexd } from "react-icons/si";

interface Skill {
    name: string;
    icon: JSX.Element;
}

interface SkillsSectionProps {
    skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => (
    <div className="w-full mx-auto mt-6 bg-white rounded-lg shadow-sm p-8">
        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
        <ul className="mt-4 grid grid-cols-2 gap-4 text-gray-600">
            {skills.map((skill, index) => (
                <li key={index} className="flex items-center space-x-3">
                    <div className="text-xl">{skill.icon}</div>
                    <span>{skill.name}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default SkillsSection;
