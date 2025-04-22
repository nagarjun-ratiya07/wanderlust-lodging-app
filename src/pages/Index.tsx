// Home page for hotel room booking demo

import * as React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RoomList } from "@/components/RoomList";
import { BookingModal } from "@/components/BookingModal";
import { Room } from "@/components/RoomList";
import { BookingList, Booking } from "@/components/BookingList";

const Index = () => {
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);
  const [bookingOpen, setBookingOpen] = React.useState(false);

  const [bookings, setBookings] = React.useState<Booking[]>([]);

  function handleBook(room: Room) {
    setSelectedRoom(room);
    setBookingOpen(true);
  }

  function handleCloseModal() {
    setBookingOpen(false);
    setSelectedRoom(null);
  }

  function handleBookingConfirmed(booking: Booking) {
    setBookings(prev => [...prev, booking]);
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-gray-50 min-h-screen px-6 py-8 flex flex-col gap-8">
          <header className="mb-2">
            <h1 className="text-3xl font-bold text-primary mb-1">Wanderlust Hotel</h1>
            <p className="text-gray-700 text-lg">Find your ideal stay & book instantly!</p>
          </header>
          <section id="rooms" className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
            <RoomList onBook={handleBook} />
          </section>
          {selectedRoom && (
            <section id="selected-room" className="flex flex-col md:flex-row bg-white shadow rounded-lg border mb-8 p-4 gap-6 items-center max-w-2xl mx-auto">
              <img
                src={selectedRoom.imageUrl}
                alt={selectedRoom.name}
                className="w-36 h-36 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg">{selectedRoom.name}</div>
                <div className="text-sm text-gray-600 mb-2">${selectedRoom.priceNight} per night &bull; {selectedRoom.beds} beds &bull; up to {selectedRoom.maxGuests} guests</div>
                <div className="text-gray-500 text-sm">{selectedRoom.description}</div>
              </div>
            </section>
          )}
          <section id="bookings" className="flex-1">
            <h2 className="text-xl font-semibold mb-4 mt-10">My Bookings</h2>
            <BookingList bookings={bookings} />
          </section>
          <footer className="text-xs text-gray-400 text-center pt-10">
            &copy; {new Date().getFullYear()} Wanderlust Hotel. For demo only.
          </footer>
        </main>
        <BookingModal
          open={bookingOpen}
          room={selectedRoom}
          onClose={handleCloseModal}
          onBookingConfirmed={handleBookingConfirmed}
        />
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
};

export default Index;
