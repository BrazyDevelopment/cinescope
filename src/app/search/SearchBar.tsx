import { useState } from "react"
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string, type: string, season?: number, episode?: number, page?: number) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const[query, setQuery] = useState("")
  const[type, setType] = useState("movie")
  const[season, setSeason] = useState<number | undefined>(undefined)
  const[episode, setEpisode] = useState<number | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      onSearch(query, type, season, episode, 1);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
      <div className="relative flex-grow w-full mb-2 sm:mb-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie, TV show, or episode..."
          className="input input-bordered w-full pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value)
          if (e.target.value === 'episode') {
            setSeason(undefined)
            setEpisode(undefined)
          }
        }}
        className="select select-bordered w-full sm:w-auto mb-2 sm:mb-0"
      >
        <option value="movie">Movie</option>
        <option value="series">TV Show</option>
        <option value="episode">Episode</option>
      </select>
      <div className="flex flex-wrap -mx-1">
        {(type === 'series' || type === 'episode') && 
          <div className="px-1 mb-2 sm:mb-0 w-full sm:w-auto">
            <input 
              type="number"
              value={season || ''}
              onChange={(e) => setSeason(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Season"
              className="input input-bordered w-full"
            />
          </div>
        }
        {type === 'episode' && 
          <div className="px-1 mb-2 sm:mb-0 w-full sm:w-auto">
            <input 
              type="number"
              value={episode || ''}
              onChange={(e) => setEpisode(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Episode"
              className="input input-bordered w-full"
            />
          </div>
        }
      </div>
      <button 
        type="submit" 
        className="btn btn-primary w-full sm:w-auto mt-2 sm:mt-0"
        disabled={type === 'episode' && (!season || !episode)}
      >
        Search
      </button>
    </form>
  )
}