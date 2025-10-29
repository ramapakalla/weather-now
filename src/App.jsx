import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'
import { getWeather } from './services/weatherService'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch(city) {
    setError(null)
    setLoading(true)
    setWeather(null)
    try {
      const data = await getWeather(city)
      setWeather(data)
    } catch (err) {
      setError(err && err.message ? err.message : 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold">Weather Now</h1>
          <p className="text-sm text-slate-700 mt-1">Search current weather powered by Open-Meteo</p>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <SearchBar onSearch={handleSearch} disabled={loading} />

          <div className="w-full flex justify-center">{loading && <Loader />}</div>

          {error && (
            <div className="w-full max-w-xl bg-red-50 border border-red-200 text-red-800 p-3 rounded">{error}</div>
          )}

          {weather && <WeatherCard data={weather} />}

          <div className="mt-6 text-xs text-slate-600 text-center">Note: This app uses Open-Meteo (no API key required). Geocoding may return multiple cities with the same name — the top match is used.</div>
        </div>
      </div>
    </div>
  )
}
