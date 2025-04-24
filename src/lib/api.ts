'use client'
import { getCookie } from "@/utils/cookies";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

clientApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Evita el bucle: no intentes refresh si ya es la petición de refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh"
    ) {
      originalRequest._retry = true;
      try {
        await clientApi.get("/refresh");
        // Aquí podrías actualizar el token si es necesario
        return clientApi(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, evita el bucle y maneja el logout/redirección
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const get = <T>(url: string, params?: object, headers?: object) => {
  return clientApi
    .get<T>(url, { params, headers })
    .then((response) => response.data);
};

export const post = <T>(url: string, data?: object, headers?: object) => {
  return clientApi
    .post<T>(url, data, { headers })
    .then((response) => response.data);
};

export const put = <T>(url: string, data: object, headers?: object) => {
  return clientApi
    .put<T>(url, data, { headers })
    .then((response) => response.data);
};

export const del = <T>(url: string, headers?: object) => {
  return clientApi
    .delete<T>(url, { headers })
    .then((response) => response.data);
};

// OLD VERSION
// import { getServerCookies } from "@/app/actions";
// import { updateAccessToken } from "@/app/actions";
// import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

// // Create a client-side Axios instance
// const clientApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   withCredentials: true, // This only works on the client side
// });

// // Create a server-side Axios instance
// const serverApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL, // Fallback to server env
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   withCredentials: true, // This only works on the client side
// });

// // Interceptor para añadir el token de acceso a las solicitudes (client-side)
// serverApi.interceptors.request.use(
//   async (config) => {
//     const token = await getServerCookies();
//     if (token.tkAccess) {
//       config.headers["Authorization"] = `${token.tkAccess.value}`;
//     }
//     return config; // Make sure to return the config
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// serverApi.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };
//     const token = await getServerCookies();

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       if (token.refreshToken) {
//         try {
//           const refreshConfig: AxiosRequestConfig = {
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Cookie: `refreshToken=${token.refreshToken.value}`,
//             },
//             withCredentials: true,
//           };

//           const { data: response } = await serverApi.post(
//             "/auth/refresh",
//             {},
//             refreshConfig
//           );

//           if (originalRequest.headers) {
//             originalRequest.headers[
//               "Authorization"
//             ] = `${response.data.tkAccess}`;
//           } else {
//             originalRequest.headers = {
//               Authorization: `${response.data.tkAccess}`,
//             };
//           }

//           return serverApi(originalRequest);
//         } catch (refreshError) {
//           return Promise.reject(refreshError);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// const isServer = () => typeof window === "undefined";

// export const get = <T>(url: string, params?: object, headers?: object) => {
//   const instance = isServer() ? serverApi : clientApi;
//   return instance
//     .get<T>(url, { params, headers })
//     .then((response) => response.data);
// };

// export const post = <T>(url: string, data?: object, headers?: object) => {
//   const instance = isServer() ? serverApi : clientApi;
//   return instance
//     .post<T>(url, data, { headers })
//     .then((response) => response.data);
// };

// export const put = <T>(url: string, data: object, headers?: object) => {
//   const instance = isServer() ? serverApi : clientApi;
//   return instance
//     .put<T>(url, data, { headers })
//     .then((response) => response.data);
// };

// export const del = <T>(url: string, headers?: object) => {
//   const instance = isServer() ? serverApi : clientApi;
//   return instance.delete<T>(url, { headers }).then((response) => response.data);
// };

// // For direct access to the instances
// export { clientApi, serverApi };

// // Default export is the client API for backward compatibility
// export default clientApi;
