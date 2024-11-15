'use client'

import { useState, useEffect } from "react"
import { SearchBar } from "./SearchBar"
import { MovieDetails } from "./MovieDetails"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import Image from "next/image"
import {   Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator } from "../components/breadcrumbs"
import Link from "next/link"
import { Film, Github, Globe, Linkedin, Star, Tv } from 'lucide-react'

interface Movie {
  imdbID: string
  Title: string
  Type: string
  Year: string
  Poster: string
}

export default function SearchPage() {
    const[movies, setMovies] = useState<any[]>([]) // Change to 'any[]' to handle different structures
    const[currentPage, setCurrentPage] = useState(1)
    const[query, setQuery] = useState("")
    const[error, setError] = useState("")
    const[totalResults, setTotalResults] = useState(0)
    const[searchType, setSearchType] = useState<string | undefined>(undefined) // To track the type of search
    // const [theme, setTheme] = useState('corporate');
    
    // useEffect(() => {
    //     const savedTheme = localStorage.getItem('theme')
    //     if (savedTheme) {
    //       setTheme(savedTheme)
    //       document.documentElement.setAttribute('data-theme', savedTheme)
    //     }
    //   }, [])

    const fetchMovies = async (query: string, type: string, season?: number, episode?: number, page: number = 1) => {
      let url = `https://www.omdbapi.com/?apikey=5442d2d&r=json`;
      
      setSearchType(type);
      
      if (type === 'episode') {
        if (season !== undefined && episode !== undefined) {
          url += `&t=${encodeURIComponent(query)}&Season=${season}&Episode=${episode}`;
        } else {
          // If season or episode is missing, show an error to the user
          setError("Please provide both season and episode number for an episode search.");
          setMovies([]);
          return;
        }
      } else if (type === 'series') {
        if (season !== undefined) {
          url += `&t=${encodeURIComponent(query)}&Season=${season}`;
        } else {
          url += `&s=${encodeURIComponent(query)}&type=series&page=${page}`;
        }
      } else {
        url += `&s=${encodeURIComponent(query)}&type=${type}&page=${page}`;
      }
    
      try {
        const res = await fetch(url);
        const data = await res.json();
    
        if (data.Response === "True") {
          if (data.Episodes) {
            setMovies(data.Episodes.map((ep: any) => ({ 
              ...ep, 
              Type: 'episode' 
            })));
          } else if (data.Search) {
            setMovies(data.Search);
          } else {
            setMovies([data]);
          }
          setTotalResults(parseInt(data.totalResults) || 1);
          setError("");
        } else {
          setMovies([]);
          setError(data.Error || "No results found.");
        }
      } catch (error) {
        setError("Failed to fetch data.");
      }
    }
  
    const handleSearch = (newQuery: string, type: string, season?: number, episode?: number, page: number = 1) => {
      setQuery(newQuery);
      setCurrentPage(page);
      fetchMovies(newQuery, type, season, episode, page);
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <a href="/" className="flex items-center">

                <Image
                  src={"/ICON LOGO.png"}
                  alt="logo"
                  width={40}
                  height={40}
                  className="max-w-full h-auto"
                />
              
            </a>
            <div className="flex flex-col items-center justify-items-center space-y-4">
            <h1 className="text-4xl flex items-center text-center ml-8 text-sky-600 impactFont">CINESCOPE</h1>
          <h1 className="text-xl font-bold flex items-center text-center ml-8">Movie & TV Show Search</h1>
          <div>
          <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className={`underline hover:text-accent`} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className={`font-bold`} />
                <BreadcrumbItem>
                  <BreadcrumbPage className={` font-bold`}>Search</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            </div>
            </div>
          
          <ThemeSwitcher />
        </div>
        <SearchBar onSearch={handleSearch} />
  
        {error && (
            <div className="alert alert-error mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}
  
        {movies.length > 0 ? (
          searchType === 'series' && totalResults < 2 || searchType === 'episode' && totalResults < 2  ? (
            // List view for episodes when searching by season
            <div className="space-y-4 mt-8">
              {movies.map((movie) => (
                <MovieDetails key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            // Grid view for movies, TV shows, or single episodes
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {movies.map((movie) => (
                <MovieDetails key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )
        ) : null}
  
        {totalResults > 10 && searchType !== 'series' && (
          <div className="flex justify-center mt-8">
            <div className="btn-group">
              <button
                className="btn btn-outline"
                onClick={() => handleSearch(query, searchType || "movie", currentPage - 1)}
                disabled={currentPage <= 1}
              >
                «
              </button>
              <button className="btn btn-outline">Page {currentPage}</button>
              <button
                className="btn btn-outline"
                onClick={() => handleSearch(query, searchType || "movie", currentPage + 1)}
                disabled={currentPage * 10 >= totalResults}
              >
                »
              </button>
            </div>
          </div>
        )}
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
                        <Link href="https://linkedin.com/in/brazy" className="flex items-center">
                            <Linkedin className="" size={32} />
                        </Link>
                        <Link href="https://github.com/BrazyDevelopment" className="flex items-center">
                            <Github className="" size={32} />
                        </Link>
                        <Link href="https://armour-hosting.com" className="flex items-center">
                            <Globe className="" size={32} />
                        </Link>
                    </div>
      </div>
    )
  }

