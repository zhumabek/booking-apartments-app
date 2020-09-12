import mongoose, { Schema, Document } from "mongoose";
import {IApartment} from "./Apartment";
import {IApartmentTimeSlot} from "./ApartmentTimeSlot";
import {IUser} from "./User";

const BookingSchema = new Schema({
    apartmentId: {
        type: Schema.Types.ObjectId,
        ref: "Apartment"
    },
    timeSlots: [{
      type: Schema.Types.ObjectId,
      ref: "ApartmentTimeSlot"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    totalCharge: {
        type: Number,
        required: true
    }
});

export interface IBooking extends Document {
    apartmentId: IApartment["_id"];
    timeSlots: IApartmentTimeSlot["_id"][];
    userId: IUser["_id"]
    totalCharge: number;
}

export default mongoose.model<IBooking>('Booking', BookingSchema);
