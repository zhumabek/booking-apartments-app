import mongoose, { Schema, Document } from "mongoose";
import {IApartment} from "./Apartment";

const ApartmentTimeSlotSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    apartmentId: {
        type: Schema.Types.ObjectId,
        ref: "Apartment"
    }
}, {timestamps: true});

export interface IApartmentTimeSlot extends Document {
    date: Date;
    isBooked: boolean;
    apartmentId: IApartment["_id"];
}

export default mongoose.model<IApartmentTimeSlot>('ApartmentTimeSlot', ApartmentTimeSlotSchema);
