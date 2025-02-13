import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const VimeoPlayer = dynamic(() => import('@/components/players/VimeoPlayer'), { 
  ssr: false,
  loading: () => <p>Loading...</p>
})
const RapidPlayer = dynamic(() => import('@/components/players/RapidPlayer'), { 
  ssr: false,
  loading: () => <p>Loading...</p>
})

export const SwitchReproductor: React.FC = () => {
  const [url, setUrl] = useState<string | null>('')
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => setPlaying(true)
  const handlePause = () => setPlaying(false)
  const handlePlayPause = () => setPlaying(!playing)

  return (
    <div className="mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-3xl">Ejemplo de Reproductor Vimeo</h1>
      <div className="mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Ingrese URL de Vimeo"
        />
      </div>
      <div className="mb-4 aspect-w-16 aspect-h-9">
        <RapidPlayer
          url={url}
  
          config={{
            playerOptions: {},
            title: 'Reproductor Vimeo'
          }}
          display="block"
        />
      </div>
      <button
        onClick={handlePlayPause}
        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
      >
        {playing ? 'Pausar' : 'Reproducir'}
      </button>
    </div>
  )
}


