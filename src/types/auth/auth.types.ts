// Define possible status values as a union type
type ActionStatus = 'fail' | 'pending' | 'success' | 'error';

// Base user data interface
interface BaseUserData {
  email: string;
  password: string;
}

// Extend base for registration data
interface RegisterUserData extends BaseUserData {
  username: string;
  confirmPassword: string;
}

// Login data type
type LoginUserData = BaseUserData;

// Combined user data type
type UserData = LoginUserData | RegisterUserData;

// Validation errors match the fields in RegisterUserData
type ValidationErrors = Partial<RegisterUserData>;

// Generic action state interface with better type constraints
interface ActionState<T = ValidationErrors, D = UserData> {
  status: ActionStatus;
  message: string;
  errors: T | null;
  data: D | null;
}

// Specific types for login and register states
type LoginActionState = ActionState<ValidationErrors, LoginUserData>;
type RegisterActionState = ActionState<ValidationErrors, RegisterUserData>;
