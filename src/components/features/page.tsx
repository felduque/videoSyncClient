import { NavRoom, Player, PlayerList } from "@/components/features";

function Room() {
  return (
    <>
      <aside className="flex flex-col bg-background p-4 w-full md:w-72 lg:w-80">
        {/* title */}
        <header className="flex justify-center mb-3 w-full">
          <h2 className="font-bold text-xl">My Rooms</h2>
        </header>
        {/* Room list */}
        <NavRoom />
      </aside>
      <section className="flex-1 gap-4 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-3 lg:grid-flow-col p-4">
        {/* player  */}
        <div className="lg:col-span-9 lg:row-span-2 bg-background rounded-lg overflow-hidden">
          <Player />
        </div>
        {/* playList */}
        <aside className="flex flex-col gap-3 lg:col-span-3 lg:row-span-2 bg-background p-4 rounded-lg">
         <PlayerList />
        </aside>
        {/* Footer player */}
        <footer className="lg:col-span-full lg:row-start-3 bg-background p-4 rounded-lg">
          Player Controls
        </footer>
      </section>
    </>
  );
}

export default Room;