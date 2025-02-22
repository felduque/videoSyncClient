"use client";

import UserList from "@/components/UserList";
import VideoPlayer from "@/components/VideoPlayer";
import VideoUrlForm from "@/components/VideoUrlForm";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

function Room() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("updateUsers", (updatedUsers: string[]) => {
      setUsers(updatedUsers);
    });

    newSocket.on("changeVideo", (url: string) => {
      setVideoUrl(url);
    })

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleVideoSubmit = (url: string) => {
    setVideoUrl(url);
    socket?.emit("changeVideo", url);
  };

  return (
    <div className="mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-2xl">Video Sync App</h1>
      <VideoUrlForm onSubmit={handleVideoSubmit} />
      <div className="flex md:flex-row flex-col gap-4">
        <div className="w-full md:w-3/4">
          <VideoPlayer url={videoUrl} socket={socket} />
        </div>
        <div className="w-full md:w-1/4">
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
}

export default Room;
