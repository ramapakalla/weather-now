const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Network error: ${res.status} ${res.statusText}`)
  const text = await res.text()
  try {
    return text ? JSON.parse(text) : {}
  } catch (e) {
    throw new Error('Invalid JSON response')
  }
}

export async function getWeather(city) {
  if (!city || !city.trim()) throw new Error('City is required')

  const geoUrl = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=5&language=en&format=json`
  const geo = await fetchJson(geoUrl)
  const results = Array.isArray(geo.results) ? geo.results : Array.isArray(geo) ? geo : []
  if (results.length === 0) throw new Error('City not found')

  const top = results[0]
  const latitude = Number(top.latitude)
  const longitude = Number(top.longitude)
  const resolvedName = top.name || city
  const country = top.country || ''

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) throw new Error('Invalid coordinates')

  const weatherUrl = `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
  const weatherResp = await fetchJson(weatherUrl)
  const current = weatherResp && weatherResp.current_weather
  if (!current) throw new Error('Weather data not available')

  return {
    city: resolvedName,
    country,
    latitude,
    longitude,
    temperature: typeof current.temperature === 'number' ? current.temperature : null,
    windspeed: typeof current.windspeed === 'number' ? current.windspeed : null,
    winddirection: typeof current.winddirection === 'number' ? current.winddirection : null,
    weathercode: typeof current.weathercode === 'number' ? current.weathercode : null,
    time: current.time || new Date().toISOString()
  }
}
