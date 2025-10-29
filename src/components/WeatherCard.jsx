import React from 'react'

const WEATHER_CODE_MAP = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
}

export default function WeatherCard({ data }) {
  if (!data) return null

  const city = data.city || ''
  const country = data.country || ''
  const temperature = typeof data.temperature === 'number' ? `${Math.round(data.temperature)}°C` : '--'
  const windspeed = typeof data.windspeed === 'number' ? `${Math.round(data.windspeed)} km/h` : '--'
  const winddirection = typeof data.winddirection === 'number' ? `${Math.round(data.winddirection)}°` : '--'
  const desc = data.weathercode != null ? (WEATHER_CODE_MAP[data.weathercode] || 'Unknown') : 'Unknown'
  const time = data.time ? new Date(data.time).toLocaleString() : new Date().toLocaleString()
  const latitude = typeof data.latitude === 'number' ? Number(data.latitude).toFixed(3) : '--'
  const longitude = typeof data.longitude === 'number' ? Number(data.longitude).toFixed(3) : '--'

  return (
    <div className="w-full max-w-xl bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{city}{country ? `, ${country}` : ''}</h2>
          <p className="text-sm text-slate-700">Updated: {time}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-extrabold">{temperature}</div>
          <div className="text-sm text-slate-600">{desc}</div>
        </div>
      </div>

      <hr className="my-4 border-slate-200" />

      <div className="flex gap-6 text-sm text-slate-700">
        <div>
          <div className="font-semibold">Wind</div>
          <div>{windspeed}</div>
          <div className="text-xs text-slate-500">Dir: {winddirection}</div>
        </div>

        <div>
          <div className="font-semibold">Coordinates</div>
          <div>{latitude}, {longitude}</div>
        </div>
      </div>
    </div>
  )
}
