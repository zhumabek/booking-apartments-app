/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getApartment
// ====================================================

export interface getApartment_getApartment {
  __typename: "Apartment";
  _id: string;
  name: string;
  description: string;
  price: number;
  numOfRooms: number;
  image: string;
}

export interface getApartment {
  getApartment: getApartment_getApartment;
}

export interface getApartmentVariables {
  id: string;
}
