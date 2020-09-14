/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getApartments
// ====================================================

export interface getApartments_getApartments_result {
  __typename: "Apartment";
  _id: string;
  name: string;
  image: string;
  numOfRooms: number;
  price: number;
}

export interface getApartments_getApartments {
  __typename: "ApartmentListing";
  total: number;
  result: getApartments_getApartments_result[];
}

export interface getApartments {
  getApartments: getApartments_getApartments;
}

export interface getApartmentsVariables {
  page: number;
  limit: number;
}
