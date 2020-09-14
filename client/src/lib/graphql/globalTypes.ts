/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface ApartmentInput {
  name: string;
  description?: string | null;
  price: number;
  numOfRooms: number;
  image?: string | null;
}

export interface ApartmentTimeSlotInput {
  _id?: string | null;
  apartmentId: string;
  date: string;
  isBooked: boolean;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
