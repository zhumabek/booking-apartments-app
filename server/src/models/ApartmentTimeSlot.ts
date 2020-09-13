import mongoose, { Schema, Document } from "mongoose";
import {IApartmentModel} from "./Apartment";

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

export interface IApartmentTimeSlotModel extends Document {
    date: Date;
    isBooked: boolean;
    apartmentId: IApartmentModel["_id"];
}

export default mongoose.model<IApartmentTimeSlotModel>('ApartmentTimeSlot', ApartmentTimeSlotSchema);
