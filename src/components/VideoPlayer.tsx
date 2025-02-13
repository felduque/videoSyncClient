'use client'

import { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { Socket } from 'socket.io-client'

interface VideoPlayerProps {
  url: string
  socket: Socket | null
}

export default function VideoPlayer({ url, socket }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const playerRef = useRef<ReactPlayer>(null)

  useEffect(() => {
    if (!socket) return

    socket.on('play', () => setPlaying(true))
    socket.on('pause', () => setPlaying(false))
    socket.on('seek', (time: number) => {
      playerRef.current?.seekTo(time)
    })

    return () => {
      socket.off('play')
      socket.off('pause')
      socket.off('seek')
    }
  }, [socket])

  const handlePlay = () => {
    setPlaying(true)
    socket?.emit('play')
  }

  const handlePause = () => {
    setPlaying(false)
    socket?.emit('pause')
  }

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played)
    socket?.emit('updateProgress', state.played)
  }

  const handleSeek = (time: number) => {
    socket?.emit('seek', time)
  }

  return (
    <div className="aspect-w-16 aspect-h-9">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onSeek={handleSeek}
        controls
      />
    </div>
  )
}

