import { login, register } from "@/services/authService";

// Define an interface for the user data
interface UserData {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  isRegister?: boolean;
}

// Define an interface for validation errors
interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface ActionState<T> {
  status: string;
  message: string;
  isError: boolean;
  errors: T | null;
}

const loginAction = async (prevState: unknown, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const errors = validateUserData({ email, password, isRegister: false });
    if (Object.keys(errors).length === 0) {
      const response = await login({ email, password });
      if (response.status === "success") {
        const { tkAccess } = response.data;
        document.cookie = `tkAccess=${tkAccess}; max-age=900; path=/`;
        return {
          status: response.status,
          message: response.message,
          isError: false,
          errors: null,
        };
      } else {
        return {
          status: response.status,
          message: response.message,
          isError: true,
          errors: null,
        };
      }
    } else {
      return {
        status: "error",
        message: "Validation errors",
        isError: true,
        errors,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "Error logging please try again later",
      isError: true,
      errors: null,
    };
  }
};

const registerAction = async (
  prevState: unknown,
  formData: FormData
): Promise<ActionState<ValidationErrors>> => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const errors = validateUserData({
    username,
    email,
    password,
    confirmPassword,
    isRegister: true,
  });
  if (Object.keys(errors).length === 0) {
    const response = await register({ username, email, password });
    if (response.status === "success") {
      const { tkAccess } = response.data;
      document.cookie = `tkAccess=${tkAccess}; max-age=900; path=/`;
      return {
        status: response.status,
        message: response.message,
        isError: false,
        errors: null,
      };
    } else {
      return {
        status: response.status,
        message: response.message,
        isError: true,
        errors: null,
      };
    }
  } else {
    return {
      status: "error",
      message: "Validation errors",
      isError: true,
      errors,
    };
  }
};

// Function to validate user data
export function validateUserData(userData: UserData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Validate username
  if (
    userData.isRegister &&
    (!userData.username || userData.username.length < 3)
  ) {
    errors.username = "Username must be at least 3 characters long";
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.email || !emailRegex.test(userData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (userData.isRegister) {
    if (!userData.password || !passwordRegex.test(userData.password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
  }

  // Validate confirm password
  if (userData.isRegister && userData.password !== userData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

const passwordRequirements = [
  { regex: /.{8,}/, label: "At least 8 characters long" },
  { regex: /[A-Z]/, label: "At least one uppercase letter" },
  { regex: /[a-z]/, label: "At least one lowercase letter" },
  { regex: /[0-9]/, label: "At least one number" },
  { regex: /[@$!%*?&]/, label: "At least one special character (@$!%*?&)" },
];
export { loginAction, registerAction, passwordRequirements };
