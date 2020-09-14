import merge from "lodash.merge"
import { userResolvers } from "./User";
import {apartmentResolvers} from "./Apartment";
import {apartmentTimeSlotResolvers} from "./ApartmentTimeSlot";

export const resolvers = merge(
    userResolvers,
    apartmentResolvers,
    apartmentTimeSlotResolvers
);
