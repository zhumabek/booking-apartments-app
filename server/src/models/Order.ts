import mongoose, { Schema, Document } from "mongoose";
import {IUser} from "./User";
import {IVoucher} from "./Voucher";

const OrderSchema = new Schema({
    voucherId: {
        type: Schema.Types.ObjectId,
        ref: "Voucher"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

export interface IOrder extends Document {
    voucherId: IVoucher["_id"];
    userId: IUser["_id"];
}

export default mongoose.model<IOrder>('Order', OrderSchema);
