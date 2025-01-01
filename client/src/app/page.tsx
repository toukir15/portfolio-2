import TypewriterComponent from "../components/home/TypewriterComponent";
import Actions from "../components/home/Actions";
import { getUser } from "../services/user/query";
import Image from "next/image";
export default async function Home() {
  const { data } = await getUser()
  return (
    <section className="h-[calc(100vh-100px)] flex gap-10 flex-col xl:flex-row justify-center lg:justify-start items-center bg-gradient-to-b from-[#1F1F1F] to-[#2D2D2D] px-4 md:px-16 text-white">
      <div className="2xl:order-2">
        <div className="h-[200px] w-[200px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px]">
          <Image src={data.profilePhoto} className="rounded-full" height={350} width={350} alt={"dsf"}></Image>
        </div>
      </div>
      <div className="max-w-3xl 2xl:order-1">
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
          Hi, I'm <span className="text-[#F9826C]">{data?.name}</span>
        </h1>
        <h2 className="text-xl xl:text-2xl mt-2 xl:mt-4 font-medium text-gray-300">
          <TypewriterComponent designation={data.designation} />
        </h2>
        <p className="mt-3 xl:mt-6 text-lg text-gray-400">
          {data.description}
        </p>
        <Actions />
      </div>
    </section>
  );
}
