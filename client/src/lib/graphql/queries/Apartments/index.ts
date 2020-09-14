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
