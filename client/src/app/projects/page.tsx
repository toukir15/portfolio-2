import Image from "next/image"; // Import the Image component
import ProjectActions from "@/src/components/project/ProjectActions";
import { getProjects } from "@/src/services/project/query";

export default async function Projects() {
    const { data } = await getProjects()
    return (
        <section className="py-8 md:py-16 min-h-[calc(100vh-100px)] bg-gradient-to-b from-[#1F1F1F] to-[#2D2D2D] text-gray-200 font-mono">
            <div className="container mx-auto px-4 max-w-7xl">
                <h1 className="text-3xl font-bold md:text-center text-[rgb(249,130,108)] mb-5 md:mb-10">
                    🌟 Stuff I've Built So Far
                </h1>
                <p className="text-lg md:text-center mb-6 md:mb-12 leading-relaxed">
                    Here’s a showcase of my work, highlighting the diverse projects I’ve developed. Each project reflects my dedication to crafting intuitive user experiences and powerful backend systems. 🚀
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {data.map((project: any, index: number) => (
                        <div
                            key={index}
                            className="bg-[#24292E] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-48 overflow-hidden rounded-t-lg group">
                                <div className=" group-hover:h-auto transition-all duration-300">
                                    <Image
                                        src={project.image}
                                        alt={project.title || "project image"}
                                        className="object-cover w-full transition-all duration-300"
                                        width={400}
                                        height={600}
                                    />
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-[rgb(249,130,108)] mb-2">
                                    {project.title}
                                </h2>
                                <p className="text-gray-300 mb-4">{project.description}</p>
                                <ProjectActions live={project.live} source={project.source} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
