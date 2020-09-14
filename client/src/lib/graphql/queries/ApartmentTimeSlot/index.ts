import { gql } from "apollo-boost";

export const APARTMENT_TIME_SLOTS = gql`
    query ApartmentTimeSlots($id: ID!) {
        apartmentTimeSlots(id: $id){
            _id
            date
            isBooked
            apartmentId
        }
    }
`;
