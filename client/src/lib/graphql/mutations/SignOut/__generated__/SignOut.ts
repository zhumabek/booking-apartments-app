/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignOut
// ====================================================

export interface SignOut_signOut {
  __typename: "User";
  _id: string | null;
  token: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  didRequest: boolean;
}

export interface SignOut {
  signOut: SignOut_signOut;
}
