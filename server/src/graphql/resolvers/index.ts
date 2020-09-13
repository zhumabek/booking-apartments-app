import merge from "lodash.merge"
import { userResolvers } from "./User";
import {apartmentResolvers} from "./Apartment";

export const resolvers = merge(userResolvers, apartmentResolvers);
