import React, { useEffect, useRef, useState } from "react";
import { getSDK } from "@/utils";
import { canPlay } from "@/utils/patterns";

const SDK_URL =  [
    "https://www.yourupload.com/jwplayer/7.12.13/jwplayer.js",
    "https://www.yourupload.com/jwplayer/7.12.13/jwplayer.controls.js",
    "https://www.yourupload.com/jwplayer/7.12.13/provider.html5.js",
    "https://www.yourupload.com/jwplayer/7.12.13/jwpsrv.js",
    "https://www.yourupload.com/jwplayer/7.12.13/sharing.js",
    "https://www.yourupload.com/jwplayer/7.12.13/related.js",
  ];
const SDK_GLOBAL = "jwplayer";

interface RapidPlayerProps {
  url: string;
  playing: boolean;
  muted: boolean;
  loop: boolean;
  playsinline: boolean;
  controls: boolean;
  onMount?: (player: any) => void;
  onReady: () => void;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (seconds: number) => void;
  onEnded: () => void;
  onError: (error: any) => void;
  onBuffer: () => void;
  onBufferEnd: () => void;
  onPlaybackRateChange: (rate: number) => void;
  config: {
    playerOptions: any;
    title?: string;
  };
  display: string;
}

const RapidPlayer: React.FC<RapidPlayerProps> = ({
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
  display,
}) => {
  const [player, setPlayer] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sdkLoaded, setSdkLoaded] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => prev + "\n" + info);
    console.log(info);
  };

  useEffect(() => {
    const checkMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase());
    };
    setIsMobile(checkMobile());

    const loadSDK = async () => {
      try {
        addDebugInfo("Loading SDK...");
        await getSDK(SDK_URL, SDK_GLOBAL);
        setSdkLoaded(true);
        addDebugInfo("SDK loaded successfully");
      } catch (error) {
        console.error("Error loading JW Player SDK:", error);
        addDebugInfo(`Error loading SDK: ${error.message}`);
        onError(error);
      }
    };

    loadSDK();
  }, []);

  useEffect(() => {
    if (sdkLoaded && containerRef.current && url) {
      addDebugInfo("Attempting to load player...");
      loadPlayer(url);
    }
  }, [sdkLoaded, url]);

  const loadPlayer = (videoUrl: string) => {
    if (!window[SDK_GLOBAL]) {
      const error = new Error("JW Player SDK not loaded");
      console.error(error);
      addDebugInfo("JW Player SDK not loaded");
      onError(error);
      return;
    }

    const jwplayer = window[SDK_GLOBAL];
    jwplayer.key = 'OuzzDaXX2aXR/LIJxk0fuyUeo5KGdnTxFe8wNw==';

    if (!containerRef.current) {
      const error = new Error("Player container not found");
      console.error(error);
      addDebugInfo("Player container not found");
      onError(error);
      return;
    }

    addDebugInfo(`Video ID extracted: ${url}`);

    const playerOptions = {
      // Use the embed URL directly instead of trying to get the MP4
      file: videoUrl,
      type: 'mp4',  // Specify that we want to use iframe mode
      width: '100%',
      height: '100%',
      autostart: playing,
      mute: muted,
      repeat: loop,
      controls: controls,
      playsinline: playsinline,
      abouttext: 'YourUpload.com',
      aboutlink: 'https://www.yourupload.com',
      advertising: {
        client: "vast",
        tag: ["myadtag1.xml","myadtag2.xml","myadtag3.xml"]
   },
      ...config.playerOptions
    };

    addDebugInfo(`Setting up player with options: ${JSON.stringify(playerOptions)}`);

    try {
      const newPlayer = jwplayer(containerRef.current.id).setup(playerOptions);

      newPlayer.on('ready', () => {
        addDebugInfo('Player is ready');
        onReady();
      });

      newPlayer.on('play', () => {
        addDebugInfo('Player started playing');
        onPlay();
      });

      newPlayer.on('pause', () => {
        addDebugInfo('Player paused');
        onPause();
      });

      newPlayer.on('error', (e: any) => {
        console.error('JW Player error:', e);
        addDebugInfo(`Player error: ${JSON.stringify(e)}`);
        onError(e);
      });

      setPlayer(newPlayer);

      if (!isMobile) {
        const resizePlayer = () => {
          newPlayer.resize(window.innerWidth, window.innerHeight);
          addDebugInfo(`Player resized to ${window.innerWidth}x${window.innerHeight}`);
        };
        window.addEventListener('resize', resizePlayer);
        newPlayer.on('fullscreen', resizePlayer);
        resizePlayer();

        return () => {
          window.removeEventListener('resize', resizePlayer);
        };
      }
    } catch (error) {
      console.error('Error setting up JW Player:', error);
      addDebugInfo(`Error setting up player: ${error.message}`);
      onError(error);
    }
  };

  return (
    <>
      <div 
        id="rapid-player" 
        ref={containerRef} 
        style={{ width: "100%", height: "100%", overflow: "hidden", display }}
      />
      <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0 }}>
          {debugInfo}
        </pre>
      </div>
    </>
  );
};

RapidPlayer.displayName = "RapidPlayer";
RapidPlayer.canPlay = canPlay.rapidplayers;

export default RapidPlayer;

