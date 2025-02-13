import loadScript from 'load-script'

export function getSDK(url: string | string[], sdkGlobal: string ): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window[sdkGlobal]) {
      resolve(window[sdkGlobal])
    } else {
      if(typeof url === 'string'){
        loadScript(url, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(window[sdkGlobal])
          }
        })
      } else {
        url.forEach(e => {
          loadScript(e, (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(window[sdkGlobal])
            }
          })
        });
      }
    }
  })
}

export function callPlayer(player: any, method: string, ...args: any[]): any {
  if (player && player[method]) {
    return player[method](...args)
  }
  console.warn(`ReactPlayer: ${method} method not available`)
  return null
}

