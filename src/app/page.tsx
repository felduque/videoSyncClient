"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Users, Globe, Zap, User, Sun, Moon } from "lucide-react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Home() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { setTheme } = useTheme();

  const handleCreateRoom = () => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      // Lógica para crear una sala
      console.log("Crear sala");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="w-[1.2rem] h-[1.2rem] rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all" />
              <Moon className="absolute w-[1.2rem] h-[1.2rem] rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48 w-full">
          <div className="px-4 md:px-6 container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none tracking-tighter">
                  Mira videos en sincronía con tus amigos
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Crea salas, invita a tus amigos y disfruta de videos juntos,
                  sin importar dónde estén.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={handleCreateRoom}>Crear una sala</Button>
                <Button variant="outline">Unirse a una sala</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24 lg:py-32 w-full">
          <div className="px-4 md:px-6 container">
            <h2 className="mb-8 font-bold text-3xl sm:text-4xl md:text-5xl text-center tracking-tighter">
              Características principales
            </h2>
            <div className="gap-10 grid sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Users className="mb-4 w-12 h-12 text-primary" />
                <h3 className="font-bold text-lg">Salas sincronizadas</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Crea salas privadas y mira videos en perfecta sincronía con
                  tus amigos.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Globe className="mb-4 w-12 h-12 text-primary" />
                <h3 className="font-bold text-lg">Acceso global</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Conéctate con amigos de todo el mundo y comparte experiencias
                  juntos.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="mb-4 w-12 h-12 text-primary" />
                <h3 className="font-bold text-lg">Fácil de usar</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Interfaz intuitiva y sencilla para que puedas empezar a
                  disfrutar de inmediato.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="px-4 md:px-6 container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter">
                  ¿Listo para empezar?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Crea tu sala ahora y empieza a disfrutar de videos con tus
                  amigos.
                </p>
              </div>
              <div className="space-y-2 w-full max-w-sm">
                <Input type="text" placeholder="Nombre de la sala" />
                <Button className="w-full" onClick={handleCreateRoom}>
                  Crear sala
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex sm:flex-row flex-col items-center gap-2 px-4 md:px-6 py-6 border-t w-full shrink-0">
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          © 2023 SyncWatch. Todos los derechos reservados.
        </p>
        <nav className="flex gap-4 sm:gap-6 sm:ml-auto">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos de servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
      <AuthModal />
    </div>
  );
}

export default function HomeWithAuth() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

// <div className="mx-auto p-4 container">
//   <h1 className="mb-4 font-bold text-2xl">Video Sync App</h1>
//   <VideoUrlForm onSubmit={handleVideoSubmit} />
//   <div className="flex md:flex-row flex-col gap-4">
//     <div className="w-full md:w-3/4">
//       <VideoPlayer url={videoUrl} socket={socket} />
//     </div>
//     <div className="w-full md:w-1/4">
//       <UserList users={users} />
//     </div>
//   </div>
// </div>

// https://player.vimeo.com/video/1046443161?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media
