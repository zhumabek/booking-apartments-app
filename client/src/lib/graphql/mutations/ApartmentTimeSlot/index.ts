import {gql} from 'apollo-boost';

export const EDIT_APARTMENT_TIME_SLOT = gql`
    mutation editApartmentTimeSlot($input: ApartmentTimeSlotInput) {
        editApartmentTimeSlot(input: $input){
            _id
            date
            isBooked
            apartmentId
        }
    }
`;