import { getSocial } from '@/src/services/social/query';
import React from 'react';

export default async function SocialLink() {
    const { data } = await getSocial();
    return (
        <>
            <div className="w-[calc(100vw-50px)] overflow-x-auto md:w-1/2 md:border-r md:border-[#F9826C] md:pr-8">
                <h2 className="text-xl font-medium mb-4 md:mb-6">Reach Out Via Socials</h2>
                <div className="flex">
                    <div className="text-lg space-y-1 pb-3">
                        <p className="flex whitespace-nowrap">
                            <span>1. </span>
                            <span className="ml-3">.socials {"{"}</span>
                        </p>
                        {Object.entries(data)?.map(([key, value], index) => {
                            const stringValue = String(value); // Ensure value is a string
                            const isEmail = key.toLowerCase() === "email"; // Check if the key is 'email'

                            return (
                                <p className="flex whitespace-nowrap" key={key}>
                                    <span>{index + 2}. </span>
                                    <span className="ml-10">
                                        {key}:{" "}
                                        <a
                                            href={isEmail ? `mailto:${stringValue}` : stringValue}
                                            className="text-[#F9826C]"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {stringValue};
                                        </a>
                                    </span>
                                </p>
                            );
                        })}

                        <p className="flex whitespace-nowrap">
                            <span>{Object.keys(data).length + 2}. </span>
                            <span className="ml-3">{"}"}</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
