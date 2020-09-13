import mongoose, {Schema, Document, Model} from "mongoose";
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

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password?: string;
    token?: string;
    checkPassword(password: string): Promise<boolean>;
}

export default mongoose.model<IUserModel>('User', UserSchema);
