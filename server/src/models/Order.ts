import mongoose, { Schema, Document } from "mongoose";
import {IUserModel} from "./User";
import {IVoucherModel} from "./Voucher";

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

export interface IOrderModel extends Document {
    voucherId: IVoucherModel["_id"];
    userId: IUserModel["_id"];
}

export default mongoose.model<IOrderModel>('Order', OrderSchema);
