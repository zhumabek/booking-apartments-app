/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signUp {
  __typename: "User";
  _id: string | null;
  token: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  didRequest: boolean;
}

export interface SignUp {
  signUp: SignUp_signUp;
}

export interface SignUpVariables {
  input?: SignUpInput | null;
}
