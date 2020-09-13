import {gql} from 'apollo-boost';

export const SIGN_IN = gql`
    mutation SignIn($input: SignInInput) {
        signIn(input: $input){
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