export interface ApartmentInputArgs {
  input: {
    name: string;
    description: string;
    price: number;
    numOfRooms: number;
    image: string;
  };
}

interface ApartmentTimeSlotInputArgs {
   date: string;
   isBooked: boolean;
}



