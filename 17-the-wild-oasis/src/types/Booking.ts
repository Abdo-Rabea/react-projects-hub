export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  cabinId: number;
  guestId: number;
};

type CabinRef = {
  name: string;
};

type GuestRef = {
  fullName: string;
  email: string;
};

export type BookingWithRelations = Booking & {
  cabins: CabinRef | null;
  guests: GuestRef | null;
};
