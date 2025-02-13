export const MATCH_URL_VIMEO = /vimeo\.com\/(?!progressive_redirect).+/
export const MATCH_URL_RAPIDPLAYERS = /rapidplayers\.com\/e\/[a-zA-Z0-9]+/
export const canPlay = {
  vimeo: (url: string) => MATCH_URL_VIMEO.test(url),
  rapidplayers: (url: string) => MATCH_URL_RAPIDPLAYERS.test(url)
}

// https://player.vimeo.com/video/1046443161?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media

// https://rapidplayers.com/e/huzp6wusnxj5

// Buscar todas las instancias posibles de JW Player
// const findJWPlayer = () => {
//   // 1. Buscar el elemento iframe o div del reproductor
//   const playerElements = Array.from(document.querySelectorAll('iframe, div')).filter(el => 
//     el.id?.toLowerCase().includes('player') || 
//     el.className?.toLowerCase().includes('player')
//   );
//   console.log('Elementos potenciales del reproductor:', playerElements);

//   // 2. Buscar propiedades globales
//   const globalProps = Object.getOwnPropertyNames(window).filter(prop => 
//     prop.toLowerCase().includes('jw') || 
//     prop.toLowerCase().includes('player')
//   );
//   console.log('Propiedades globales relacionadas:', globalProps);

//   // 3. Buscar scripts relacionados
//   const scripts = Array.from(document.getElementsByTagName('script')).filter(script => 
//     script.src?.toLowerCase().includes('jw') || 
//     script.src?.toLowerCase().includes('player')
//   );
//   console.log('Scripts relacionados:', scripts);

//   // 4. Intentar acceder a métodos comunes de JW Player
//   const possibleInstances = [
//     window.jwplayer,
//     window.JWPlayer,
//     window.jwplayerInstance,
//     window.JWPlayerInstance
//   ];
//   console.log('Posibles instancias:', possibleInstances.filter(Boolean));
// }

// // Ejecutar la búsqueda
// findJWPlayer();