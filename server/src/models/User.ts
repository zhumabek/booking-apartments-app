import mongoose, { Schema, Document } from "mongoose";
import {userRoles} from "./constants";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: [Object.values(userRoles)],
        default: userRoles.BUYER
    },
    token: {
        type: String
    }
});

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password?: string;
    token?: string;
}

export default mongoose.model<IUser>('User', UserSchema);
