import React, { useState } from 'react'

export default function SearchBar({ onSearch, disabled = false }) {
  const [query, setQuery] = useState('')

  function submit(e) {
    e.preventDefault()
    const q = query.trim()
    if (!q || disabled) return
    onSearch(q)
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city (e.g. London, Tokyo)"
        className="flex-1 p-3 rounded-l-lg shadow-md outline-none focus:ring-2 focus:ring-sky-400"
        aria-label="city"
        disabled={disabled}
      />
      <button
        type="submit"
        className="px-4 py-3 bg-sky-600 text-white font-semibold rounded-r-lg shadow-md hover:bg-sky-700 disabled:opacity-50"
        disabled={disabled}
      >
        Search
      </button>
    </form>
  )
}
