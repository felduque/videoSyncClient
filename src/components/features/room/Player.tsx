"use client";
import React, { useEffect, useRef, useState } from "react";

export const Player = ({ videoId = "lklviac39uuq" }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);

  // Escuchar mensajes del iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Mensaje recibido:', event.data);
      
      // Intentar extraer información del evento
      try {
        const data = event.data;
        
        // Verificar si es un evento del reproductor
        if (data && data.event) {
          console.log('Evento del reproductor:', data.event);
          
          switch (data.event) {
            case 'ready':
              console.log('Reproductor listo');
              setPlayerReady(true);
              break;
            case 'play':
              console.log('Reproduciendo');
              setIsPlaying(true);
              break;
            case 'pause':
              console.log('Pausado');
              setIsPlaying(false);
              break;
            case 'time':
              setCurrentTime(data.position || 0);
              break;
            default:
              console.log('Otro evento:', data.event);
          }
        }
      } catch (error) {
        console.error('Error al procesar mensaje:', error);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Función para enviar comandos al iframe
  const sendCommand = (command: string, data?: any) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    
    try {
      iframeRef.current.contentWindow.postMessage({
        action: command,
        data
      }, '*');
      
      console.log(`Comando enviado: ${command}`, data);
    } catch (error) {
      console.error('Error al enviar comando:', error);
    }
  };

  // Funciones para controlar el reproductor
  const playVideo = () => {
    sendCommand('play');
  };

  const pauseVideo = () => {
    sendCommand('pause');
  };

  const seekTo = (seconds: number) => {
    sendCommand('seek', { position: seconds });
  };

  // URL de nuestro propio reproductor proxy
  const playerUrl = `http://localhost:3001/api/proxy/player/${videoId}`;
  
  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative flex-grow w-full">
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src={playerUrl}
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      </div>
      
      {/* Controles fijos en la parte inferior */}
      <div className="z-10 flex justify-center items-center gap-4 bg-secondary p-4">
        <button 
          onClick={isPlaying ? pauseVideo : playVideo}
          className={`p-2 rounded-full text-white ${isPlaying ? 'bg-red-500' : 'bg-blue-500'}`}
          disabled={!playerReady}
        >
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </button>
        
        <button 
          onClick={() => seekTo(currentTime + 10)}
          className="bg-green-500 p-2 rounded-full text-white"
          disabled={!playerReady}
        >
          +10s
        </button>
        
        <div className="text-sm">
          Tiempo: {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
        </div>
        
        <div className="text-xs">
          {playerReady ? 'Reproductor listo' : 'Cargando reproductor...'}
        </div>
      </div>
    </div>
  );
};