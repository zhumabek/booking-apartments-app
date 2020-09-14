import { Request } from "express";
import { User as IUser} from "../types";
import User from "../../models/User";

export const authorize = async (
    req: Request
): Promise<IUser | null> => {
    const token = req.get("X-CSRF-TOKEN");
    const user = await User.findOne({
        _id: req.signedCookies.user,
        token
    });
    if(!user){
        throw new Error("Token malformed! You are not authorized!");
    }

    return {
        ...user.toObject()
    };
};
