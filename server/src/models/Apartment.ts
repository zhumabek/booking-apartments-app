import mongoose, { Schema, Document } from "mongoose";

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
    }
});

export interface IApartment extends Document {
    name: string;
    description?: string;
    price: number;
    numOfRooms: number;
    image?: string;
    imagePublicId?: string;
    checkInDate: Date;
    checkOutDate: Date;
}

export default mongoose.model<IApartment>('Apartment', ApartmentSchema);
