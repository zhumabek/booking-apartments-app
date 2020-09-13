import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  token?: string;
  role?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  didRequest: boolean;
}

export interface IApartment {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  numOfRooms: number;
  image: string;
  imagePublicId: string;
  owner: ObjectId
  timeSlots: IApartmentTimeSlot[]
}

interface IApartmentTimeSlot {
  date: string;
  isBooked: boolean;
  apartmentId: ObjectId
}

