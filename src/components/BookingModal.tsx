
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
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

type Props = {
  open: boolean;
  room: Room | null;
  onClose: () => void;
};

export function BookingModal({ open, room, onClose }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const canBook = Boolean(room && date && name && email);

  function handleBook() {
    if (!room) return;
    toast({
      title: `Booking Confirmed`,
      description: (
        <div>
          <strong>{room.name}</strong><br />
          {date ? format(date, "PPP") : ""}<br />
          {name} ({email})
        </div>
      ),
    });
    onClose();
    setTimeout(() => {
      setDate(undefined);
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
            <label className="block mb-1 text-sm font-medium">Select Date</label>
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                onClick={() => {}}
              >
                <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
              <div className="absolute z-10 mt-1 left-0 right-0 bg-white border rounded shadow-lg">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
            </div>
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
