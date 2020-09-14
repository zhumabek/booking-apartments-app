/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApartmentInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: apartment
// ====================================================

export interface apartment_apartment {
  __typename: "Apartment";
  _id: string;
  name: string;
}

export interface apartment {
  apartment: apartment_apartment;
}

export interface apartmentVariables {
  input?: ApartmentInput | null;
}
