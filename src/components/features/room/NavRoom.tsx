'use client'

import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { listRoom } from "@/services/roomsService"
import Link from "next/link"
import useSWR from 'swr'
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { User } from "lucide-react"

// Componente para mostrar una sala individual
function RoomCard({ room }: { room: any }) {
  return (
    <Link href={`/rooms/${room.id}`}>
      <article className="flex items-center gap-3 bg-secondary hover:bg-secondary/80 dark:bg-gray-800 p-2 rounded-lg w-full h-fit transition-colors cursor-pointer">
        <DynamicIcon 
          name={room.icon} 
          fallback="Cast"
          size={32}
          className="flex justify-center items-center bg-muted rounded-md w-16 h-16"
        />
        <div className="flex flex-col flex-1 justify-center gap-1 h-full">
          <h3 className="font-bold text-base lowercase">{room.name}</h3>
          <p className="text-muted-foreground text-xs text-wrap">{room.description} </p>
          <div className="flex justify-between items-center gap-2">
            <Badge className="w-fit">{room.category}</Badge>
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              {room.users?.avatar_url ? (
                <img src={room.users.avatar_url} alt={room.users.username} className="rounded-full w-5 h-5" />
              ) : (
                <User className="w-4 h-4" />
              )}
              {room.users?.username}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export const NavRoom = ()  => {
  const { data, error, isLoading } = useSWR('rooms', listRoom)
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data || data?.rooms?.length === 0) return <p>No rooms</p>
  console.log(data)
  return (
    <nav className="flex flex-col gap-3 p-2 w-full h-full overflow-y-auto">
      {data?.rooms?.map((room: any) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </nav>
  )
}
