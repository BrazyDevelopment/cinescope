import Link from 'next/link'
import { Film, Github, Globe, Linkedin, Star, Tv } from 'lucide-react'
import Image from 'next/image'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {

    return (
    <main>
        <div className="flex justify-between items-center">
          <Link href="https://armour.dev" className="flex items-center">

                <Image
                  src={"/ICON LOGO.png"}
                  alt="logo"
                  width={40}
                  height={40}
                  className="max-w-full h-auto ml-5"
                />
              
            </Link>
            
          <h1 className="text-4xl flex items-center text-center ml-8 text-sky-600 impactFont">CINESCOPE</h1>
          <ThemeSwitcher />
        </div>

        <div className="relative  w-full min-h-screen flex items-center justify-center  overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-1/4 transform -translate-x-3/4 -translate-y-3/4  opacity-20">
                <Film size={300} />
                </div>
                <div className="absolute right-1/4 bottom-1/4 transform translate-x-3/4 translate-y-1/2  opacity-20">
                <Tv size={300} />
                </div>
            </div>

            <div className="relative flex flex-col items-center justify-center text-center px-4 pt-6">
                <div className='-my-28 sm:-my-32 md:-my-44 lg:-my-52 xl:-my-56 ml-5'>
                <Image
                  src={"/cinescope.png"}
                  alt="logo"
                  width={800}
                  height={800}
                  className="max-w-full h-auto mr-8 mb-4"
                />
                </div>
                <p className="text-xl md:text-2xl mb-12 animate-fade-in-up animation-delay-200">
                Explore a world of movies, TV shows, and more with our powerful search engine.
                </p>
                <div className="mb-10 flex justify-center space-x-8 animate-fade-in-up animation-delay-400">
                    <Star className="font-bold text-yellow-400" size={32} />
                    <Film className="font-bold text-blue-400" size={32} />
                    <Tv className="font-bold text-green-400" size={32} />
                </div>
                <Link href="/search" className="inline-block">
                <button className="bg-sky-800/80 text-white hover:bg-primary-dark border border-neutral-content font-bold py-3 px-8 rounded-full text-lg transition duration-1000 ease-in-out transform hover:scale-105 animate-pulse">
                    START YOUR SEARCH!
                </button>
                </Link>
                <div className="flex justify-center items-center mt-12">
                    <Link href="https://armour.dev" className="flex items-center">
                        <Image
                        src={"/ICON LOGO.png"}
                        alt="logo"
                        width={40}
                        height={40}
                        className="max-w-full h-auto"
                        />
                        <p className="text-xl md:text-2xl animate-fade-in-up animation-delay-200 ml-2">
                            Developed by Armour Solutions
                        </p>
                    </Link>
                </div>
                    <div className="flex justify-center mt-4 space-x-8 animate-fade-in-up animation-delay-400">
                        <Link href="https://linkedin.com/in/brazy" className="flex items-center font-thin">
                            <Linkedin className="font-thin" size={32} />
                        </Link>
                        <Link href="https://github.com/BrazyDevelopment" className="flex items-center">
                            <Github className="" size={32} />
                        </Link>
                        <Link href="https://armour-hosting.com" className="flex items-center">
                            <Globe className="" size={32} />
                        </Link>
                        <Link href="https:/discord.gg/armour" className="flex items-center"><DiscordLogoIcon width={32} height={32} /></Link>
        <Link href="https:/x.com/Armour_Hosting" className="flex items-center"><FaXTwitter size={32} /></Link>
                    </div>
                </div>
        </div>
    </main>
  )
}