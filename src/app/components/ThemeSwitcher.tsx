'use client'

import { useState, useEffect, useContext } from 'react'
import { Moon, Sun } from 'lucide-react'
import { ThemeContext } from '../ThemeContext';

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext) || {};

  if (!theme || !setTheme) return null;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])



  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  return (
    <div className="dropdown dropdown-end z-50">
      <div tabIndex={0} className="btn gap-1 normal-case btn-ghost">
        <span className="hidden md:inline">Theme</span>
        {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </div>
      <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          {themes.map((t) => (
            <button
              key={t}
              className={`outline-base-content overflow-hidden rounded-lg text-left ${
                t === theme ? 'outline outline-2 outline-offset-2' : ''
              }`}
              onClick={() => setTheme(t)}
            >
              <div data-theme={t} className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                    <div className="flex-grow text-sm font-bold">{t}</div>
                    <div className="flex flex-shrink-0 flex-wrap gap-1">
                      <div className="bg-primary w-2 rounded"></div>
                      <div className="bg-secondary w-2 rounded"></div>
                      <div className="bg-accent w-2 rounded"></div>
                      <div className="bg-neutral w-2 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}