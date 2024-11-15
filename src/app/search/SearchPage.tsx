'use client';

import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { MovieDetails } from "./MovieDetails";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/breadcrumbs";
import Link from "next/link";
import { Github, Globe, Linkedin } from 'lucide-react';
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { FaXTwitter } from "react-icons/fa6";


interface Movie {
  imdbID: string; 
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
  Season?: string;
  Episode?: string;
}

export default function SearchPage() {
  const[movies, setMovies] = useState<Movie[]>([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[query, setQuery] = useState("");
  // const[error, setError] = useState("");
  const[totalResults, setTotalResults] = useState(0);
  const[searchType, setSearchType] = useState<string | undefined>(undefined);
  const[isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query: string, type: string, season?: number, episode?: number, page: number = 1) => {
    setIsLoading(true);
    let url = `https://www.omdbapi.com/?apikey=5442d2d&r=json`;

    setSearchType(type);

    // Construct URL based on search type
    if (type === 'movie') {
      url += `&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
    } else if (type === 'series' && season === undefined) {
      // For TV shows without a season specified
      url += `&s=${encodeURIComponent(query)}&type=series&page=${page}`;
    } else {
      if (type === 'episode' && season !== undefined && episode !== undefined) {
        url += `&t=${encodeURIComponent(query)}&Season=${season}&Episode=${episode}`;
      } else if (type === 'series') {
        url += `&t=${encodeURIComponent(query)}&Season=${season}`;
      }
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        let filteredMovies: Movie[] = [];
        if ((type === 'movie' || (type === 'series' && season === undefined)) && data.Search) {
          filteredMovies = data.Search.slice(0, 9);
          setTotalResults(Math.min(data.totalResults, 9 * Math.ceil(data.totalResults / 9)));
        } else {
          filteredMovies =[data];
          setTotalResults(1);
        }
        setMovies(filteredMovies);
        // setError("");
      } else {
        setMovies([]);
        // setError(data.Error || "No results found.");
        setTotalResults(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery: string, type: string, season?: number, episode?: number, page: number = 1) => {
    setQuery(newQuery);
    setCurrentPage(page);
    fetchMovies(newQuery, type, season, episode, page);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handleSearch(query, searchType || "movie", undefined, undefined, newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="https://armour.dev" className="flex items-center">
          <Image src={"/ICON LOGO.png"} alt="logo" width={40} height={40} className="max-w-full h-auto" />
            {/* <Image src={"/cinescope.png"} alt="logo" width={400} height={400} className="max-w-full items-center object-center justify-center h-auto -my-16 sm:-my-32 -z-1" /> */}
        </Link>
        <div className="flex flex-col items-center space-y-4 ml-4 md:ml-16">
          <Link href="/" className="flex items-center">
            <Image src={"/cinescope.png"} alt="logo" width={400} height={400} className="max-w-full items-center object-center justify-center h-auto -my-16 sm:-my-32 -z-1" />
          </Link>
          
          <h1 className="text-xl font-bold flex items-center text-center">Movie & TV Show Search</h1>
          <div className="z-50">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="underline hover:text-accent" href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="font-bold" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold">Search</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <ThemeSwitcher />
      </div>

      <SearchBar onSearch={handleSearch} />
      
      {isLoading && <div className="flex justify-center mt-8"><div className="loading loading-spinner loading-lg"></div></div>}
      {/* {error && <div className="alert alert-error mt-4">{error}</div>} */}
      
      {!isLoading && movies.length > 0 && (
        <>
          <div className="text-sm text-gray-500 mt-4 mb-2">Found {totalResults} results</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {movies.map(movie => <MovieDetails key={movie.imdbID} movie={movie} />)}
          </div>
          {totalResults > 9 && (searchType === 'movie' || !movies[0]?.Season) && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button className="join-item btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>«</button>
                <button className="join-item btn">Page {currentPage}</button>
                <button className="join-item btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * 9 >= totalResults}>»</button>
              </div>
              <span className="ml-4 flex items-center text-sm">Page {currentPage} of {Math.ceil(totalResults / 9)}</span>
            </div>
          )}
        </>
      )}

      <div className="flex justify-center items-center mt-12">
        <Link href="https://armour.dev" className="flex items-center">
          <Image src={"/ICON LOGO.png"} alt="logo" width={40} height={40} className="max-w-full h-auto" />
          <p className="text-xl md:text-2xl ml-2">Developed by Armour Solutions</p>
        </Link>
      </div>
      <div className="flex justify-center mt-4 space-x-8">
        <Link href="https://linkedin.com/in/brazy" className="flex items-center"><Linkedin size={32} /></Link>
        <Link href="https://github.com/BrazyDevelopment" className="flex items-center"><Github size={32} /></Link>
        <Link href="https://armour-hosting.com" className="flex items-center"><Globe size={32} /></Link>
        <Link href="https://discord.gg/armour" className="flex items-center"><DiscordLogoIcon width={32} height={32} /></Link>
        <Link href="https://x.com/Armour_Hosting" className="flex items-center"><FaXTwitter size={32} /></Link>
      </div>
    </div>
  );
}