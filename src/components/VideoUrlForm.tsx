'use client'

import { useState } from 'react'

interface VideoUrlFormProps {
  onSubmit: (url: string) => void
}

export default function VideoUrlForm({ onSubmit }: VideoUrlFormProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(url)
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter video URL"
        className="p-2 border rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-500 mt-2 px-4 py-2 rounded text-white">
        Load Video
      </button>
    </form>
  )
}

