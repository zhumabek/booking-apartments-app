import {gql} from 'apollo-boost';

export const CREATE_APARTMENT = gql`
    mutation apartment($input: ApartmentInput) {
        apartment(input: $input){
            _id
            name
        }
    }
`;

export const DELETE_APARTMENT = gql`
    mutation deleteApartment($id: ID!) {
        deleteApartment(id: $id){
            _id
            name
        }
    }
`;
