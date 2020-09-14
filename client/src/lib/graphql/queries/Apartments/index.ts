import { gql } from "apollo-boost";

export const GET_APARTMENTS = gql`
    query getApartments($page: Int!, $limit: Int!) {
        getApartments(page: $page, limit: $limit){
            total
            result {
                _id
                name
                image
                numOfRooms
                price
            }
        }
    }
`;

export const GET_APARTMENT = gql`
    query getApartment($id: ID!) {
        getApartment(id: $id){
            _id
            name
            description
            price
            numOfRooms
            image
        }
    }
`;

