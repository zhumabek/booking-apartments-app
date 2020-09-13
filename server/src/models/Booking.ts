import mongoose, { Schema, Document } from "mongoose";
import {IApartmentModel} from "./Apartment";
import {IApartmentTimeSlotModel} from "./ApartmentTimeSlot";
import {IUserModel} from "./User";

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
}, {timestamps: true});

export interface IBookingModel extends Document {
    apartmentId: IApartmentModel["_id"];
    timeSlots: IApartmentTimeSlotModel["_id"][];
    userId: IUserModel["_id"]
    totalCharge: number;
}

export default mongoose.model<IBookingModel>('Booking', BookingSchema);
