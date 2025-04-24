'use client'
import Link from "next/link";
import React from "react";
import { Play, Users, Globe, Zap, User, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

export const Navigation = () => {
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <header className="flex items-center px-4 lg:px-6 h-14">
      <Link className="flex justify-center items-center" href="#">
        <Play className="mr-2 w-6 h-6" />
        <span className="font-bold">SyncWatch</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6 ml-auto">
        <Link
          className="font-medium text-sm hover:underline underline-offset-4"
          href="#"
        >
          Características
        </Link>
        <Link
          className="font-medium text-sm hover:underline underline-offset-4"
          href="#"
        >
          Cómo funciona
        </Link>
        <Link
          className="font-medium text-sm hover:underline underline-offset-4"
          href="#"
        >
          Precios
        </Link>
      </nav>
      <Button
        variant="ghost"
        size="icon"
        className="mr-4 ml-4"
        aria-label="Login/Register"
        onClick={openAuthModal}
      >
        <User className="w-5 h-5" />
      </Button>
      <ThemeToggle />
    </header>
  );
};
