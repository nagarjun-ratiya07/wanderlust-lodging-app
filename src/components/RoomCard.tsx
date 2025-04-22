
import { BedDouble, Users, DoorClosed } from "lucide-react";
import { Button } from "@/components/ui/button";

type Room = {
  id: string;
  name: string;
  imageUrl: string;
  priceNight: number;
  beds: number;
  maxGuests: number;
  description: string;
  available: boolean;
};

type Props = {
  room: Room;
  onBook: (room: Room) => void;
};

export const RoomCard = ({ room, onBook }: Props) => (
  <div className="flex flex-col rounded-lg shadow-md bg-white transition hover:shadow-lg">
    <img src={room.imageUrl} alt={room.name} className="rounded-t-lg w-full h-48 object-cover" />
    <div className="flex-1 flex flex-col p-4">
      <h3 className="text-lg font-semibold mb-1">{room.name}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-2 gap-4">
        <span className="flex items-center gap-1"><BedDouble size={16}/> {room.beds} Beds</span>
        <span className="flex items-center gap-1"><Users size={16}/> {room.maxGuests} Guests</span>
      </div>
      <p className="text-gray-500 text-xs mb-3 line-clamp-2">{room.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-primary font-bold text-lg">${room.priceNight}/night</span>
        <Button
          size="sm"
          disabled={!room.available}
          onClick={() => onBook(room)}
          className="rounded-full"
        >
          {room.available ? "Book Now" : (
            <span className="flex items-center gap-1"><DoorClosed size={14} /> Unavailable</span>
          )}
        </Button>
      </div>
    </div>
  </div>
);
