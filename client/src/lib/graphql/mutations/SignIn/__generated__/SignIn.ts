/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_signIn {
  __typename: "User";
  _id: string | null;
  token: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  didRequest: boolean;
}

export interface SignIn {
  signIn: SignIn_signIn;
}

export interface SignInVariables {
  input?: SignInInput | null;
}
