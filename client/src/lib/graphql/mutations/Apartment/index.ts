import {gql} from 'apollo-boost';

export const CREATE_APARTMENT = gql`
    mutation apartment($input: ApartmentInput) {
        apartment(input: $input){
            _id
            name
        }
    }
`;