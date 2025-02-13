import axios, { type AxiosError, type AxiosRequestConfig } from "axios"

// Crear una instancia de Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
})

// Almacenamiento del token de acceso
let accessToken: string | null = null

// Interceptor para añadir el token de acceso a las solicitudes
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para manejar errores de respuesta y refrescar el token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Intenta refrescar el token
        const response = await api.post("/auth/refresh")
        accessToken = response.data.tkAccess
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`
        } else {
          originalRequest.headers = {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        return api(originalRequest)
      } catch (refreshError) {
        // Si no se puede refrescar, redirige al login
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

// Funciones para diferentes tipos de solicitudes
export const get = <T>(url: string, params?: object) => 
  api.get<T>(url, { params }).then(response => response.data);

export const post = <T>(url: string, data?: object) => 
  api.post<T>(url, data).then(response => response.data);

export const put = <T>(url: string, data: object) => 
  api.put<T>(url, data).then(response => response.data);

export const del = <T>(url: string) => 
  api.delete<T>(url).then(response => response.data);

export default api;
