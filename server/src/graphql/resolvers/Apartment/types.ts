import {IApartment} from "../../../lib/types";

export interface ApartmentInputArgs {
  input: {
    name: string;
    description: string;
    price: number;
    numOfRooms: number;
    image: string;
  };
}

export interface GetApartmentsInputArgs {
    limit: number;
    page: number;
}

export interface GetApartmentsData {
    total: number;
    result: IApartment[]
}

