import { gql } from "apollo-boost";

export const SIGN_OUT = gql`
    mutation SignOut {
        signOut {
            _id
            token
            email
            firstName
            lastName
            role
            didRequest
        }
    }
`;
