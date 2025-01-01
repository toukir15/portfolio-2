import { getSocial } from '@/src/services/social/query';
import React from 'react';

export default async function SocialLink() {
    const { data } = await getSocial();
    return (
        <div className="w-full px-4 md:px-8 lg:w-1/2 lg:border-r lg:border-[#F9826C] lg:pr-8 overflow-x-auto">
            <h2 className="text-xl font-medium mb-4 md:mb-6 text-center lg:text-left">
                Reach Out Via Socials
            </h2>
            <div className="flex justify-center lg:justify-start">
                <div className="text-base md:text-lg space-y-3 pb-3">
                    {/* Opening Bracket */}
                    <p className="flex">
                        <span>1. </span>
                        <span className="ml-3">.socials {"{"}</span>
                    </p>

                    {/* Social Links */}
                    {Object.entries(data)?.map(([key, value], index) => {
                        const stringValue = String(value); // Ensure value is a string
                        const isEmail = key.toLowerCase() === "email"; // Check if the key is 'email'

                        return (
                            <p className="flex break-all" key={key}>
                                <span>{index + 2}. </span>
                                <span className="ml-8">
                                    {key}:{" "}
                                    <a
                                        href={isEmail ? `mailto:${stringValue}` : stringValue}
                                        className="text-[#F9826C] underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {stringValue};
                                    </a>
                                </span>
                            </p>
                        );
                    })}

                    {/* Closing Bracket */}
                    <p className="flex">
                        <span>{Object.keys(data).length + 2}. </span>
                        <span className="ml-3">{"}"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
