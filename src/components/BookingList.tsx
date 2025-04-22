
import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export type Booking = {
  id: string;
  room: {
    id: string;
    name: string;
    imageUrl: string;
    priceNight: number;
    beds: number;
    maxGuests: number;
    description: string;
    available: boolean;
  };
  checkIn: Date;
  checkOut: Date;
  name: string;
  email: string;
};

type Props = {
  bookings: Booking[];
  onCancel?: (bookingId: string) => void;
};

export const BookingList = ({ bookings, onCancel }: Props) => {
  if (!bookings.length) {
    return (
      <div className="text-gray-500 text-center py-8">
        No bookings yet. Book a room to see your reservations here!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center bg-white shadow border rounded-lg overflow-hidden"
        >
          <img
            src={booking.room.imageUrl}
            alt={booking.room.name}
            className="w-24 h-24 object-cover"
          />
          <div className="flex-1 px-4 py-2">
            <div className="font-semibold text-lg">{booking.room.name}</div>
            <div className="text-gray-600 text-sm">
              {format(new Date(booking.checkIn), "PPP")}
              {" "}—{" "}
              {format(new Date(booking.checkOut), "PPP")}
            </div>
            <div className="text-gray-500 text-xs">{booking.name} ({booking.email})</div>
          </div>
          <div className="flex flex-col items-end gap-2 pr-4">
            <div className="font-bold text-primary">${booking.room.priceNight}</div>
            {onCancel && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(booking.id)}
                className="flex items-center gap-1 mt-2"
              >
                <Trash2 size={16} />
                Cancel
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
