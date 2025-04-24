"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { loginAction, registerAction } from "./authActions.ts";
import { PasswordStrength } from "./PasswordStrength.tsx";
import { initialStateLogin, initialStateRegister } from "./helper.ts";
import { useRouter } from "next/navigation"
 
export function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthModalOpen, closeAuthModal, setIsAuthenticated } = useAuth();
  const [passwordCheck, setPasswordCheck] = useState("");

  const [loginState, loginActionState, isLoginPending] = useActionState(
    loginAction,
    initialStateLogin
  );

  const [registerState, registerActionState, isRegisterPending] =
    useActionState(registerAction, initialStateRegister);

  const router = useRouter()

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (registerState.status === "success" || loginState.status === "success") {
      resetStates();
      setIsAuthenticated(true);
      closeAuthModal();
      // router.push("/rooms")
    }
  }, [registerState, loginState]);

  useEffect(() => {
    resetStates();
  }, [isLogin]);
  const resetStates = (): void => {
    if (!isLogin) {
      registerAction(null, null);
    } else {
      loginAction(null, null);
    }
    formRef.current?.reset();
    setPasswordCheck("");
  };
  const toggleAuth = () => setIsLogin(!isLogin);
  
  return (
    <Dialog open={isAuthModalOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
          <DialogDescription>
            {isLogin
              ? "Enter your credentials to login."
              : "Create a new account."}
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <form
              id="auth-form"
              action={isLogin ? loginActionState : registerActionState}
              className="space-y-4"
              ref={formRef}
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   const formData = new FormData(e.target as HTMLFormElement);
              //   const data = Object.fromEntries(formData.entries());
              //   if (isLogin) {
              //     loginAction(data, setIsAuthenticated);
              //   } else {
              //     registerAction(data, setIsAuthenticated);
              //   }
              // }}
            >
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username">User name</Label>
                  <Input
                    id="username"
                    name="username"
                    type="username"
                    defaultValue={registerState.data?.username}
                    className={
                      registerState.errors?.username && "border-destructive"
                    }
                    required
                  />
                  {registerState.status === "error" &&
                    registerState.errors?.username && (
                      <p className="text-red-500">
                        {registerState.errors.username}
                      </p>
                    )}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={
                    isLogin ? loginState.data?.email : registerState.data?.email
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className={
                    registerState.errors?.password && "border-destructive"
                  }
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  defaultValue={
                    isLogin
                      ? loginState.data?.password
                      : registerState.data?.password
                  }
                  required
                />
                {registerState.status === "error" &&
                  registerState.errors?.password && (
                    <p className="text-red-500">
                      {registerState.errors.password}
                    </p>
                  )}
                {!isLogin && <PasswordStrength password={passwordCheck} />}
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={
                      registerState.errors?.confirmPassword &&
                      "border-destructive"
                    }
                    defaultValue={registerState.data?.confirmPassword}
                    required
                  />
                  {registerState.status === "error" &&
                    registerState.errors?.confirmPassword && (
                      <p className="text-red-500">
                        {registerState.errors.confirmPassword}
                      </p>
                    )}
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoginPending || isRegisterPending}
              >
                {isLoginPending || isRegisterPending
                  ? "Processing..."
                  : isLogin
                  ? "Login"
                  : "Register"}
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={toggleAuth}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
