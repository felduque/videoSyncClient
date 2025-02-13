// Auth 
type ApiStatus = "success" | "error" | "fail"

export interface RegisterResponse {
    status: ApiStatus;
    message: string;
    data: {
        tkAccess: string;
    };
}

export interface LoginResponse {
    status: ApiStatus;
    message: string;
    data: {
        tkAccess: string;
    };
}