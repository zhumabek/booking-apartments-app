/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApartmentTimeSlotInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: editApartmentTimeSlot
// ====================================================

export interface editApartmentTimeSlot_editApartmentTimeSlot {
  __typename: "ApartMentTimeSlot";
  _id: string;
  date: string;
  isBooked: boolean;
  apartmentId: string;
}

export interface editApartmentTimeSlot {
  editApartmentTimeSlot: editApartmentTimeSlot_editApartmentTimeSlot;
}

export interface editApartmentTimeSlotVariables {
  input?: ApartmentTimeSlotInput | null;
}
