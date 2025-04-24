const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function validateLoginData(data: LoginUserData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateRegisterData(data: RegisterUserData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.username || data.username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password || !passwordRegex.test(data.password)) {
    errors.password = "Password does not meet minimum security requirements";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
