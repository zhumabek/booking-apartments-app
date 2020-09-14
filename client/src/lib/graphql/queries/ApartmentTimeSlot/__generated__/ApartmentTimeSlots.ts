/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ApartmentTimeSlots
// ====================================================

export interface ApartmentTimeSlots_apartmentTimeSlots {
  __typename: "ApartMentTimeSlot";
  _id: string;
  date: string;
  isBooked: boolean;
  apartmentId: string;
}

export interface ApartmentTimeSlots {
  apartmentTimeSlots: ApartmentTimeSlots_apartmentTimeSlots[];
}

export interface ApartmentTimeSlotsVariables {
  id: string;
}
