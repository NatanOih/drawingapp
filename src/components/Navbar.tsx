import Image from "next/image";
import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";

export default function Navbar() {
  return (
    <header className="flex flex-row fixed top-2 left-0 justify-between items-center border-2 bg-gray-950  border-stone-400/50 rounded-md gap-4 truncate w-full  p-4">
      <Link href="/" className="flex space-x-2 items-center">
        <h1 className="sm:text-4xl text-3xl font-bold ml-2 tracking-tight text-white hover:text-white/50">
          StupidDraw
        </h1>
      </Link>

      <Link href="/test">
        <h1 className="md:text-4xl text-3xl font-bold ml-2 tracking-tight text-white hover:text-white/50">
          Test Area
        </h1>
      </Link>
    </header>
  );
}
