"use client";

import { useEffect, useState } from "react";
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
import {
  loginAction,
  registerAction,
  passwordRequirements,
} from "./user-validation.ts";
import { PasswordStrength } from "./PasswordStrength.tsx";

export function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthModalOpen, closeAuthModal, setIsAuthenticated } = useAuth();
  const [passwordCheck, setPasswordCheck] = useState("");
  
  const [loginState, loginActionState, isLoginPending] = useActionState(
    loginAction,
    { message: "", isError: false, errors: null, status: "" }
  );

  const [registerState, registerActionState, isRegisterPending] =
    useActionState(registerAction, {
      message: "",
      isError: false,
      errors: null,
      status: "",
    });


  useEffect(() => {
    console.log(loginState);
    console.log(registerState);
    if (registerState.status === "success" || loginState.status === "success") {
      alert(loginState.message);
    }
  }, [registerState, loginState]);

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
              action={isLogin ? loginActionState : registerActionState}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username">User name</Label>
                  <Input
                    id="username"
                    name="username"
                    type="username"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
                {!isLogin && <PasswordStrength password={passwordCheck} />}
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                  />
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
