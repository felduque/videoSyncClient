import React, { useEffect, useRef, useState } from 'react'
import { getSDK } from '@/utils'
import { canPlay } from '@/utils/patterns'

const SDK_URL = 'https://player.vimeo.com/api/player.js'
const SDK_GLOBAL = 'Vimeo'

const cleanUrl = (url: string) => {
  return url.replace('/manage/videos', '')
}

interface VimeoPlayerProps {
  url: string
  playing: boolean
  muted: boolean
  loop: boolean
  playsinline: boolean
  controls: boolean
  onMount?: (player: any) => void
  onReady: () => void
  onPlay: () => void
  onPause: () => void
  onSeek: (seconds: number) => void
  onEnded: () => void
  onError: (error: any) => void
  onBuffer: () => void
  onBufferEnd: () => void
  onPlaybackRateChange: (rate: number) => void
  config: {
    playerOptions: any
    title?: string
  }
  display: string
}

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({
  url,
  playing,
  muted,
  loop,
  playsinline,
  controls,
  onMount,
  onReady,
  onPlay,
  onPause,
  onSeek,
  onEnded,
  onError,
  onBuffer,
  onBufferEnd,
  onPlaybackRateChange,
  config,
  display
}) => {
  const [player, setPlayer] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<number | null>(null)
  const [secondsLoaded, setSecondsLoaded] = useState<number | null>(null)

  useEffect(() => {
    if (onMount) onMount(player)
  }, [player, onMount])

  useEffect(() => {
    if (containerRef.current) {
      load(url)
    }
    return () => {
      if (player) {
        player.unload()
      }
    }
  }, [url])

  const load = (videoUrl: string) => {
    setDuration(null)
    getSDK(SDK_URL, SDK_GLOBAL).then(Vimeo => {
      console.log("-------------------------------------")
      console.log(typeof Vimeo)
      console.log(Vimeo)
      console.log("-------------------------------------")
      if (!containerRef.current) return
      const { playerOptions, title } = config
      const newPlayer = new Vimeo.Player(containerRef.current, {
        url: cleanUrl(videoUrl),
        autoplay: playing,
        muted,
        loop,
        playsinline,
        controls,
        ...playerOptions
      })
      console.log(newPlayer)
      setPlayer(newPlayer)

      newPlayer.ready().then(() => {
        const iframe = containerRef.current!.querySelector('iframe')
        if (iframe) {
          iframe.style.width = '100%'
          iframe.style.height = '100%'
          if (title) {
            iframe.title = title
          }
        }
      }).catch(onError)

      newPlayer.on('loaded', () => {
        onReady()
        refreshDuration()
      })
      newPlayer.on('play', () => {
        onPlay()
        refreshDuration()
      })
      newPlayer.on('pause', onPause)
      newPlayer.on('seeked', (e: { seconds: number }) => onSeek(e.seconds))
      newPlayer.on('ended', onEnded)
      newPlayer.on('error', onError)
      newPlayer.on('timeupdate', ({ seconds }: { seconds: number }) => {
        console.log(seconds, "time update")
        setCurrentTime(seconds)
      })
      newPlayer.on('progress', ({ seconds }: { seconds: number }) => {
        setSecondsLoaded(seconds)
      })
      newPlayer.on('bufferstart', onBuffer)
      newPlayer.on('bufferend', onBufferEnd)
      newPlayer.on('playbackratechange', (e: { playbackRate: number }) => onPlaybackRateChange(e.playbackRate))
    }, onError)
  }

  const refreshDuration = () => {
    player.getDuration().then((duration: number) => {
      setDuration(duration)
    })
  }

  const style = {
    width: '100%',
    height: '100%',
    overflow: 'hidden' as const,
    display
  }

  return (
    <div
      key={url}
      ref={containerRef}
      style={style}
    />
  )
}

VimeoPlayer.displayName = 'Vimeo'
VimeoPlayer.canPlay = canPlay.vimeo

export default VimeoPlayer

