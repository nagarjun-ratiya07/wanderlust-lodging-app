
// Home page for hotel room booking demo

import * as React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RoomList } from "@/components/RoomList";
import { BookingModal } from "@/components/BookingModal";
import { Room } from "@/components/RoomList";

const Index = () => {
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);
  const [bookingOpen, setBookingOpen] = React.useState(false);

  function handleBook(room: Room) {
    setSelectedRoom(room);
    setBookingOpen(true);
  }

  function handleCloseModal() {
    setBookingOpen(false);
    setSelectedRoom(null);
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
          <footer className="text-xs text-gray-400 text-center pt-10">
            &copy; {new Date().getFullYear()} Wanderlust Hotel. For demo only.
          </footer>
        </main>
        <BookingModal open={bookingOpen} room={selectedRoom} onClose={handleCloseModal} />
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
};

export default Index;
