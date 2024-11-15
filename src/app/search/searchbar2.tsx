'use client'

import { useState } from "react"
import { Search } from 'lucide-react'

interface SearchBarProps {
    onSearch: (
        query: string, 
        type: string, 
        season?: number, 
        episode?: number,
        page?: number
    ) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("movie")
  const[season, setSeason] = useState<number | undefined>(undefined)
  const[episode, setEpisode] = useState<number | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      onSearch(query, type === 'episode' ? 'episode' : 'series', season, episode, 1);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie or TV show..."
          className="input input-bordered w-full pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="select select-bordered"
      >
        <option value="movie">Movie</option>
        <option value="series">TV Show</option>
        {/* <option value="episode">Episode</option> */}
      </select>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  )
}