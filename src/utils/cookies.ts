export const setCookie = (name: string, value: string, maxAge: number) => {
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
  };