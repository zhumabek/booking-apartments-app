import mongoose, { Schema, Document } from "mongoose";
import {userRoles} from "./constants";
import bcrypt from "bcrypt";

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
        enum: [...Object.values(userRoles)],
        default: userRoles.BUYER
    },
    token: {
        type: String
    }
});

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.set('toObject', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
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
