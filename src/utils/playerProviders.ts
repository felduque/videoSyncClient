// Definición de tipos para los proveedores de video
export interface VideoProvider {
  name: string;
  pattern: RegExp;
  extractVideoId?: (url: string) => string | null;
  getEmbedUrl?: (videoId: string) => string;
}

// Lista de proveedores de video soportados
export const videoProviders: VideoProvider[] = [
  {
    name: 'Vimeo',
    pattern: /vimeo\.com\/(\d+)|player\.vimeo\.com\/video\/(\d+)/,
    extractVideoId: (url) => {
      const match = url.match(/vimeo\.com\/(\d+)|player\.vimeo\.com\/video\/(\d+)/);
      return match ? (match[1] || match[2]) : null;
    },
    getEmbedUrl: (videoId) => `https://player.vimeo.com/video/${videoId}`
  },
  {
    name: 'RapidPlayers',
    pattern: /rapidplayers\.com\/e\/([a-zA-Z0-9]+)/,
    extractVideoId: (url) => {
      const match = url.match(/rapidplayers\.com\/e\/([a-zA-Z0-9]+)/);
      return match ? match[1] : null;
    },
    getEmbedUrl: (videoId) => `https://rapidplayers.com/e/${videoId}`
  },
  {
    name: 'YouTube',
    pattern: /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
    extractVideoId: (url) => {
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
      return match ? match[1] : null;
    },
    getEmbedUrl: (videoId) => `https://www.youtube.com/embed/${videoId}`
  },
  {
    name: 'YourUpload',
    pattern: /yourupload\.com\/watch\/([a-zA-Z0-9]+)/,
    extractVideoId: (url) => {
      const match = url.match(/yourupload\.com\/watch\/([a-zA-Z0-9]+)/);
      return match ? match[1] : null;
    },
    getEmbedUrl: (videoId) => `https://www.yourupload.com/embed/${videoId}`
  }
];

// Función para detectar el proveedor de una URL
export const detectProvider = (url: string): VideoProvider | null => {
  if (!url) return null;
  
  return videoProviders.find(provider => provider.pattern.test(url)) || null;
};

// Función para obtener la URL de incrustación
export const getEmbedUrl = (url: string): string => {
  const provider = detectProvider(url);
  
  if (!provider || !provider.extractVideoId || !provider.getEmbedUrl) {
    // Si no se puede detectar el proveedor o no tiene las funciones necesarias, devolver la URL original
    return url;
  }
  
  const videoId = provider.extractVideoId(url);
  if (!videoId) return url;
  
  return provider.getEmbedUrl(videoId);
};

// Función para registrar un nuevo proveedor
export const registerProvider = (provider: VideoProvider): void => {
  // Verificar si ya existe un proveedor con el mismo nombre
  const existingIndex = videoProviders.findIndex(p => p.name === provider.name);
  
  if (existingIndex >= 0) {
    // Reemplazar el proveedor existente
    videoProviders[existingIndex] = provider;
  } else {
    // Agregar el nuevo proveedor
    videoProviders.push(provider);
  }
};