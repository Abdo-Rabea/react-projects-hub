export type BookingFilter = {
  field: string;
  value: string;
  method: "eq" | "gte";
};
