import { NavRoom } from "@/components/features";

async function RoomList() {
  return (
    <>
      {/* title */}
      <header className="flex justify-center mb-3 w-full">
        <h2 className="font-bold text-xl">My Rooms</h2>
      </header>
      {/* Room list */}
      <NavRoom />
    </>
  );
}

export default RoomList;
