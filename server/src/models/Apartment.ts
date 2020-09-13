import mongoose, { Schema, Document } from "mongoose";
import {IUserModel} from "./User";

const ApartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    numOfRooms: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    imagePublicId: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

export interface IApartmentModel extends Document {
    name: string;
    description?: string;
    price: number;
    numOfRooms: number;
    image?: string;
    imagePublicId?: string;
    owner: IUserModel["_id"]
}

export default mongoose.model<IApartmentModel>('Apartment', ApartmentSchema);
