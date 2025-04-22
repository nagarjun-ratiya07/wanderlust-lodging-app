
import * as React from "react";
import { BookingList, Booking } from "@/components/BookingList";

// Dummy booking list for now
const BookingsPage = () => {
  const [bookings] = React.useState<Booking[]>([]);
  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-4">My Bookings</h1>
      <BookingList bookings={bookings} />
      {bookings.length === 0 && (
        <div className="text-gray-400 mt-2">No bookings found.</div>
      )}
    </div>
  );
};
export default BookingsPage;
