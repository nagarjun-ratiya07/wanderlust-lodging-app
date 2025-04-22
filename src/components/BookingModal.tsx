
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

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

type Booking = {
  id: string;
  room: Room;
  checkIn: Date;
  checkOut: Date;
  name: string;
  email: string;
};

type Props = {
  open: boolean;
  room: Room | null;
  onClose: () => void;
  onBookingConfirmed?: (booking: Booking) => void;
};

export function BookingModal({ open, room, onClose, onBookingConfirmed }: Props) {
  // Single state object for range, to ensure correct typing for Calendar
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({ from: undefined, to: undefined });
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const canBook =
    Boolean(room) && !!dateRange.from && !!dateRange.to && !!name && !!email;

  function handleBook() {
    if (!room || !dateRange.from || !dateRange.to || !name || !email) return;
    const booking: Booking = {
      id: Date.now().toString(),
      room,
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      name,
      email,
    };

    toast({
      title: `Booking Confirmed`,
      description: (
        <div>
          <strong>{room.name}</strong><br />
          {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
          <br />
          {name} ({email})
        </div>
      ),
    });

    if (onBookingConfirmed) {
      onBookingConfirmed(booking);
    }

    onClose();
    setTimeout(() => {
      setDateRange({ from: undefined, to: undefined });
      setName("");
      setEmail("");
    }, 300);
  }

  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book: <span className="font-semibold">{room.name}</span></DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <img src={room.imageUrl} alt={room.name} className="rounded-lg w-full h-40 object-cover mb-3" />
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <span>{room.beds} beds</span>
            <span>{room.maxGuests} guests</span>
            <span>${room.priceNight}/night</span>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Select Dates</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    (!dateRange.from || !dateRange.to) && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                    : <span>Pick check-in and check-out</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => setDateRange(range ?? { from: undefined, to: undefined })}
                  initialFocus
                  numberOfMonths={2}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              placeholder="Your name"
              className="border px-3 py-2 rounded w-full"
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              autoFocus
            />
            <input
              placeholder="Your email"
              className="border px-3 py-2 rounded w-full"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button disabled={!canBook} onClick={handleBook}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
