'use client'

import Image from 'next/image'
import { useState } from "react"
import { Star, Calendar, Clock } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'

interface Movie {
  imdbID: string
  Title: string
  Type: string
  Year?: string
  Poster?: string
  Plot?: string
  Ratings?: { Source: string; Value: string }[]
  Director?: string
  Writer?: string
  Actors?: string
  Genre?: string
  Runtime?: string
  Released?: string
  Awards?: string
  imdbRating?: string
  imdbVotes?: string
  Metascore?: string
  Country?: string
  Language?: string
  BoxOffice?: string
  Production?: string
  DVD?: string
  totalSeasons?: string
  Website?: string
  Season?: string
  Episode?: string
  seriesID?: string
}

interface MovieDetailsProps {
  movie: Movie
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const [details, setDetails] = useState<Movie | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=5442d2d&i=${movie.imdbID}&plot=full`)
      const data = await res.json()
      if (data.Response === "True") {
        setDetails({
          ...movie, 
          ...data,
          Ratings: data.Ratings || [], 
        })
        setIsModalOpen(true)
      } else {
        console.error("Failed to fetch movie details:", data.Error)
      }
    } catch (error) {
      console.error("Error fetching movie details:", error)
    }
  }

  const StarRating = ({ rating }: { rating: string }) => {
    const numStars = Math.round(parseFloat(rating) / 2)
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < numStars ? 'fill-yellow-400' : ''}`} />
        ))}
        <span className="ml-2 text-sm">{rating}</span>
      </div>
    )
  }

  const getPosterImage = () => {
    // Use series poster if episode doesn't have one
    if (movie.Poster && movie.Poster !== "N/A") return movie.Poster;
    // Fallback to a placeholder or series poster if available in state or props
    if (movie.seriesID) return `/api/image?i=${movie.seriesID}`; // Assuming you can fetch the series poster like this
    return "/placeholder.png"; // Default placeholder image
  };

  if (movie.Type === "episode") {
    return (
      <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-4 flex items-center justify-items-center">
        {movie.Poster && movie.Poster !== "N/A" && (
        <Image
          src={getPosterImage()}
          alt={movie.Title}
          width={300}
          height={300}
          className="mb-4 rounded-md"
        />
      )}
       {/* <h3 className="text-lg font-semibold mb-2">{movie.Title}</h3> */}
        <h3 className="text-lg font-semibold mb-2">{movie.Title}</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{movie.Released}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>S{movie.Season} E{movie.Episode}</span>
          </div>
        </div>
        {movie.imdbRating && <StarRating rating={movie.imdbRating} />}
        <button className="btn btn-primary btn-md max-w-xs mt-4 flex items-center justify-items-center" onClick={fetchMovieDetails}>More Details</button>
        <EpisodeDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} details={details} />
      </div>
    )
  }



  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <Image
          src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          width={300}
          height={445}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{movie.Title}</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{movie.Year}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{movie.Runtime}</span>
          </div>
        </div>
        {/* <p>{movie.Type === "episode" ? `S${movie.Season} E${movie.Episode}` : `${movie.Type} - ${movie.Year}`}</p> */}
        <div className="card-actions">
          <button className="btn btn-primary" onClick={fetchMovieDetails}>More Details</button>
        </div>
        <MovieDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} details={details} />
      </div>
    </div>
  )
}

function MovieDetailsModal({ isOpen, onClose, details }: { isOpen: boolean, onClose: () => void, details: Movie | null }) {
  if (!details) return null

  const StarRating = ({ rating }: { rating: string }) => {
    const numStars = Math.round(parseFloat(rating) / 2)
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < numStars ? 'fill-yellow-400' : ''}`} />
        ))}
        <span className="ml-2">{rating}/10</span>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center justify-center sm:max-w-[425px] bg-base-100">
        <DialogHeader>
          <DialogTitle>{details.Title}</DialogTitle>
          <DialogDescription>
            {details.Year} • {details.Runtime}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {details.Poster && details.Poster !== "N/A" && (
            <div className="flex justify-center mb-4">
              <Image
                src={details.Poster}
                alt={details.Title}
                width={200}
                height={300}
                className="rounded-md"
              />
            </div>
          )}
          {details.imdbRating && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">IMDb Rating</h4>
              <StarRating rating={details.imdbRating} />
            </div>
          )}
          <div className="space-y-4">
            {details.Plot && (
              <div>
                <h4 className="text-sm font-medium mb-1">Plot</h4>
                <p className="text-sm">{details.Plot}</p>
              </div>
            )}
            {details.Genre && (
              <div>
                <h4 className="text-sm font-medium mb-1">Genre</h4>
                <div className="flex flex-wrap gap-2">
                  {details.Genre.split(', ').map((genre) => (
                    <Badge key={genre} variant="secondary">{genre}</Badge>
                  ))}
                </div>
              </div>
            )}
            {details.Director && (
              <div>
                <h4 className="text-sm font-medium mb-1">Director</h4>
                <p className="text-sm">{details.Director}</p>
              </div>
            )}
            {details.Writer && (
              <div>
                <h4 className="text-sm font-medium mb-1">Writer</h4>
                <p className="text-sm">{details.Writer}</p>
              </div>
            )}
            {details.Actors && (
              <div>
                <h4 className="text-sm font-medium mb-1">Actors</h4>
                <p className="text-sm">{details.Actors}</p>
              </div>
            )}
            {details.Awards && (
              <div>
                <h4 className="text-sm font-medium mb-1">Awards</h4>
                <p className="text-sm">{details.Awards}</p>
              </div>
            )}
            {details.BoxOffice && (
              <div>
                <h4 className="text-sm font-medium mb-1">Box Office</h4>
                <p className="text-sm">{details.BoxOffice}</p>
              </div>
            )}
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              {details.Released && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Released</h4>
                  <p className="text-sm">{details.Released}</p>
                </div>
              )}
              {details.Country && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Country</h4>
                  <p className="text-sm">{details.Country}</p>
                </div>
              )}
              {details.Language && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Language</h4>
                  <p className="text-sm">{details.Language}</p>
                </div>
              )}
              {details.Production && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Production</h4>
                  <p className="text-sm">{details.Production}</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function EpisodeDetailsModal({ isOpen, onClose, details }: { isOpen: boolean, onClose: () => void, details: Movie | null }) {
  if (!details) return null

  const getPosterImage = () => {
    // Use series poster if episode doesn't have one
    if (details.Poster && details.Poster !== "N/A") return details.Poster;
    // Fallback to a placeholder or series poster if available in state or props
    if (details.seriesID) return `/api/image?i=${details.seriesID}`; // Assuming you can fetch the series poster like this
    return "/placeholder.png"; // Default placeholder image
  };

  const StarRating = ({ rating }: { rating: string }) => {
    const numStars = Math.round(parseFloat(rating) / 2)
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < numStars ? 'fill-yellow-400' : ''}`} />
        ))}
        <span className="ml-2">{rating}/10</span>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-base-100">
        <DialogHeader>
          <DialogTitle>{details.Title}</DialogTitle>
          <DialogDescription>
            Season {details.Season}, Episode {details.Episode}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
        <div className="flex justify-center mb-4">
            <Image
              src={getPosterImage()}
              alt={details.Title}
              width={300}
              height={445}
              className="rounded-md"
            />
          </div>
          {details.imdbRating && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">IMDb Rating</h4>
              <StarRating rating={details.imdbRating} />
            </div>
          )}
          <div className="space-y-4">
            {details.Plot && (
              <div>
                <h4 className="text-sm font-medium mb-1">Plot</h4>
                <p className="text-sm">{details.Plot}</p>
              </div>
            )}
            {details.Director && (
              <div>
                <h4 className="text-sm font-medium mb-1">Director</h4>
                <p className="text-sm">{details.Director}</p>
              </div>
            )}
            {details.Writer && (
              <div>
                <h4 className="text-sm font-medium mb-1">Writer</h4>
                <p className="text-sm">{details.Writer}</p>
              </div>
            )}
            {details.Actors && (
              <div>
                <h4 className="text-sm font-medium mb-1">Actors</h4>
                <p className="text-sm">{details.Actors}</p>
              </div>
            )}
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              {details.Released && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Released</h4>
                  <p className="text-sm">{details.Released}</p>
                </div>
              )}
              {details.Runtime && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Runtime</h4>
                  <p className="text-sm">{details.Runtime}</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}