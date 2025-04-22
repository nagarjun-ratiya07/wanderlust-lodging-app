
import * as React from "react";
import { RoomList } from "@/components/RoomList";

const Rooms = () => (
  <div className="px-6 py-8 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold text-primary mb-4">Rooms</h1>
    <RoomList />
  </div>
);

export default Rooms;
