import { Request, Response } from "express";
import { IResolvers } from "apollo-server-express";
import {SignInArgs, SignUpArgs} from "./types";
import User, { IUser } from "../../../models/User";
import {userRoles} from "../../../models/constants";
import crypto from "crypto";
import bcrypt from "bcrypt";
import {config} from "../../../config";

export const userResolvers: IResolvers = {
  Mutation: {
    signUp: async (
        _root: undefined,
        {input}: SignUpArgs,
        { req, res }: { req: Request; res: Response }
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

        res.cookie("user", newUser._id, {
          ...config.cookieOptions,
          maxAge: 365 * 24 * 60 * 60 * 1000
        });

        return newUser;
      } catch (error) {
        throw new Error(`Failed to sign up: ${error}`);
      }
    },

    signIn: async (
        _root: undefined,
        { input }: SignInArgs,
        { req, res }: { req: Request; res: Response }
    ): Promise<IUser> => {

      try {
        const { email, password } = input;
        const user = await User.findOne({email});

        if (!user) {
          throw new Error('Incorrect email or password!');
        }
        const validPassword = await user.checkPassword(password);

        if (!validPassword) {
          throw new Error('Incorrect email or password!');
        }

        const newToken = crypto.randomBytes(16).toString("hex");

        user.token = newToken;
        await user.save();

        res.cookie("user", user._id, {
          ...config.cookieOptions,
          maxAge: 365 * 24 * 60 * 60 * 1000
        });

        return user;
      } catch (error) {
        throw new Error(`Failed to sign in: ${error}`);
      }
    },

    signOut: (_root: undefined, _args: unknown, { res }: { res: Response }): { didRequest: boolean } => {
      try {
        res.clearCookie("viewer", config.cookieOptions);
        return { didRequest: true }
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    },

  }
};
