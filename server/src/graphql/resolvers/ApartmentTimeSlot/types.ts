export interface ApartmentTimeSlotsQueryInputArgs {
  id: string;
}
export interface EditApartmentTimeSlotInputArgs {
  input: {
    _id?: string;
    date: string;
    isBooked: boolean;
    apartmentId: string
  };
}





