import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  token?: string;
  role?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  didRequest: boolean;
}
