const initialStateLogin: LoginActionState = {
  message: "",
  errors: null,
  status: "pending",
  data: {
    email: "",
    password: "",
  },
};

const initialStateRegister: RegisterActionState = {
  message: "",
  errors: null,
  status: "pending",
  data: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

interface TypePasswordRequirement {
  regex: RegExp;
  label: string;
}

const passwordRequirements: TypePasswordRequirement[] = [
  { regex: /.{8,}/, label: "At least 8 characters long" },
  { regex: /[A-Z]/, label: "At least one uppercase letter" },
  { regex: /[a-z]/, label: "At least one lowercase letter" },
  { regex: /[0-9]/, label: "At least one number" },
  { regex: /[@$!%*?&]/, label: "At least one special character (@$!%*?&)" },
];

export { initialStateLogin, initialStateRegister, passwordRequirements };
