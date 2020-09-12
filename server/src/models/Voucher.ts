import mongoose, { Schema, Document } from "mongoose";
import {voucherVariants} from "./constants";

const VoucherSchema = new Schema({
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
    quantity: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    imagePublicId: {
        type: String
    },
    variant: {
        type: String,
        enum: [Object.values(voucherVariants)],
        default: [voucherVariants.RESTAURANT]
    }
}, {timestamps: true});

export interface IVoucher extends Document {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    image?: string;
    imagePublicId?: string;
    variant: string;
}

export default mongoose.model<IVoucher>('Voucher', VoucherSchema);
