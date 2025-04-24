import type { Metadata } from "next";
import { Footer } from "@/components/layout/index";
export const metadata: Metadata = {
  title: "Room",
  description: "Create a room to watch videos together",
};

export default function RoomLayout({
  children,
  // roomList,
  roomContent,
}: {
  children: React.ReactNode;
  // roomList: React.ReactNode;
  roomContent: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-1 gap-2 bg-secondary">
          <aside className="flex flex-col bg-background p-4 w-full md:w-72 lg:w-80">
            {children}
          </aside>
          {roomContent}
        </main>
        <Footer />
      </div>
    </>
  );
}
