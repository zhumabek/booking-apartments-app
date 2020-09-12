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
  id: string;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface SignUp {
  signUp: SignUp_signUp;
}

export interface SignUpVariables {
  input?: SignUpInput | null;
}
