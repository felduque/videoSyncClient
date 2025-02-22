import { login, register } from "@/services/authService";
import { initialStateLogin, initialStateRegister } from "./helper";
import { validateLoginData, validateRegisterData } from "./validators";
import { setCookie } from "@/utils/cookies"; // Sugerencia: crear este utilitario

export const loginAction = async (
  prevState: unknown,
  formData: FormData | null
): Promise<LoginActionState> => {
  try {
    if (!formData) return initialStateLogin;
    
    const loginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const errors = validateLoginData(loginData);
    if (Object.keys(errors).length > 0) {
      return {
        status: "error",
        message: "Validation errors",
        errors,
        data: loginData,
      };
    }

    const response = await login(loginData);
    if (response.status === "success") {
      setCookie('tkAccess', response.data.tkAccess, 900);
    }

    return {
      status: response.status,
      message: response.message,
      errors: null,
      data: loginData,
    };

  } catch (error) {
    return {
      status: "error",
      message: "Error logging please try again later",
      errors: null,
      data: { email: "", password: "" },
    };
  }
};

export const registerAction = async (
  prevState: unknown,
  formData: FormData | null
): Promise<RegisterActionState> => {
  if (!formData) return initialStateRegister;

  const registerData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const errors = validateRegisterData(registerData);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Validation errors",
      errors,
      data: registerData,
    };
  }

  try {
    const response = await register(registerData);
    if (response.status === "success") {
      setCookie('tkAccess', response.data.tkAccess, 900);
    }

    return {
      status: response.status,
      message: response.message,
      errors: null,
      data: registerData,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error registering please try again later",
      errors: null,
      data: registerData,
    };
  }
};