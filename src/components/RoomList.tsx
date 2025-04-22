
import * as React from "react";
import { RoomCard } from "./RoomCard";

const demoRooms = [
  {
    id: "101",
    name: "Deluxe Suite",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
    priceNight: 178,
    beds: 2,
    maxGuests: 4,
    description: "A luxurious suite with king bed, en-suite, and beautiful view.",
    available: true,
  },
  {
    id: "102",
    name: "Classic Room",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    priceNight: 102,
    beds: 1,
    maxGuests: 2,
    description: "Comfortable room perfect for singles or couples.",
    available: true,
  },
  {
    id: "103",
    name: "Family Apartment",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=500&q=80",
    priceNight: 245,
    beds: 3,
    maxGuests: 6,
    description: "Spacious with kitchenette and living area, perfect for families.",
    available: false,
  },
  {
    id: "104",
    name: "Twin Room",
    imageUrl: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=500&q=80",
    priceNight: 99,
    beds: 2,
    maxGuests: 2,
    description: "Cozy room with twin beds. Ideal for friends or siblings.",
    available: true,
  }
];

export type Room = typeof demoRooms[0];

type Props = {
  onBook: (room: Room) => void;
};

export const RoomList = ({ onBook }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {demoRooms.map(room => (
      <RoomCard key={room.id} room={room} onBook={onBook} />
    ))}
  </div>
);
