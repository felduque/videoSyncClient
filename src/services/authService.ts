import { LoginRequest, RegisterRequest } from "@/types/api/request.types";
import { post } from "../lib/api";
import { LoginResponse, RegisterResponse } from "@/types/api/response.types";

export const login = (data: LoginRequest) =>
  post<LoginResponse>("/api/login", data);

// docs

/**
 * @param username
 * @param email
 * @param password
 * @example
 * ```typescript
 * register("John Doe", "john@example.com", "password")
 * ```
 * @returns  {Promise<RegisterResponse>}
 */
export const register = (data: RegisterRequest): Promise<RegisterResponse> =>
  post<RegisterResponse>("/api/register", data);
