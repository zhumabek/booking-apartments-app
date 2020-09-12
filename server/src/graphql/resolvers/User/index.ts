import { IResolvers } from "apollo-server-express";
import { SignUpArgs } from "./types";
import User, { IUser } from "../../../models/User";
import {userRoles} from "../../../models/constants";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const userResolvers: IResolvers = {
  Mutation: {
    signUp: async (
        _root: undefined,
        {input}: SignUpArgs,
    ): Promise<IUser> => {
      try {
        const {email, password, firstName, lastName} = input;
        const user = await User.findOne({email});

        if (user) {
          throw new Error('User with this email already been registered!');
        }

        const token = crypto.randomBytes(16).toString("hex");
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
          firstName,
          lastName,
          email,
          token,
          password: hashedPassword,
          role: userRoles.SELLER,
        });

        return newUser;
      } catch (error) {
        throw new Error(`Failed to sign up: ${error}`);
      }
    },
  }
};
