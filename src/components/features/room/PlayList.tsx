"use client";
import { useState } from "react";
import { Play, X, Shuffle, Repeat, Settings, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const PlayerList = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
    <>
      {/* Title playlist */}
      <header className="flex flex-col bg-secondary dark:bg-gray-800 p-3 rounded-lg">
        <h3 className="mb-2 font-bold text-lg text-center truncate">
          Playlist: Your playlist name
        </h3>
        <div className="relative flex justify-center gap-3">
          <div
            className={`flex items-center transition-all duration-300 ${
              isSearchOpen ? "w-full" : "w-9"
            }`}
          >
            {isSearchOpen ? (
              <div className="relative flex items-center w-full">
                <Search className="left-2 absolute w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search in playlist"
                  className="bg-background/30 py-1.5 pr-8 pl-8 rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                  autoFocus
                />
                <button
                  className="right-2 absolute hover:text-red-500 transition-colors"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                className="flex justify-center hover:bg-background/30 p-1.5 rounded-md w-full transition-colors"
                title="Search"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            className={`hover:bg-background/30 p-1.5 rounded-md transition-colors ${
              isSearchOpen ? "hidden" : "block"
            }`}
            title="Shuffle"
            aria-label="Shuffle playlist"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            className={`hover:bg-background/30 p-1.5 rounded-md transition-colors ${
              isSearchOpen ? "hidden" : "block"
            }`}
            title="Repeat"
            aria-label="Repeat playlist"
          >
            <Repeat className="w-4 h-4" />
          </button>
          <button
            className={`hover:bg-background/30 p-1.5 rounded-md transition-colors ${
              isSearchOpen ? "hidden" : "block"
            }`}
            title="Settings"
            aria-label="Playlist settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* List video */}
      <ul className="flex flex-col gap-3 max-h-[calc(100vh-380px)] overflow-y-auto">
        <li className="group flex gap-3 bg-secondary dark:bg-gray-800 p-2 rounded-lg h-16">
          <div className="group relative w-16 h-full">
            <img
              className="rounded-md w-full h-full object-cover"
              src="/otaku.png"
              alt="Video thumbnail"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-md transition-opacity">
              <Play className="group-active:text-red-400 w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center h-full">
            <h4 className="mb-1 font-bold text-base">Room name</h4>
            <Badge className="w-fit">Vimeo</Badge>
          </div>
          <button
            className="self-center opacity-0 group-hover:opacity-100 p-2 hover:text-red-500 transition-colors"
            aria-label="Remove from playlist"
          >
            <X className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </>
  );
};
