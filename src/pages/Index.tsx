
import * as React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RoomList } from "@/components/RoomList";
import { BookingModal } from "@/components/BookingModal";
import { Room } from "@/components/RoomList";
import { BookingList, Booking } from "@/components/BookingList";
import { Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

  function handleBookingCancel(bookingId: string) {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been successfully cancelled.",
    });
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
            <BookingList bookings={bookings} onCancel={handleBookingCancel} />
          </section>
          <section
            id="contact-info"
            className="mt-4 max-w-xl mx-auto bg-white rounded-lg shadow border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">Contact Information</h3>
              <p className="text-gray-600 mb-2">Have questions or need help with your booking? Reach out to us:</p>
              <div className="flex items-center gap-2 mb-1">
                <Mail size={18} className="text-primary" />
                <span className="text-sm text-gray-700">contact@wanderlusthotel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-primary" />
                <span className="text-sm text-gray-700">+1 (555) 123-4567</span>
              </div>
            </div>
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
