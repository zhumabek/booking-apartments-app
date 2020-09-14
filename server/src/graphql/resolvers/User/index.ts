import { Request, Response } from "express";
import { IResolvers } from "apollo-server-express";
import {SignInArgs, SignUpArgs} from "./types";
import User, { IUserModel } from "../../../models/User";
import {userRoles} from "../../../models/constants";
import crypto from "crypto";
import bcrypt from "bcrypt";
import {config} from "../../../config";
import {User as Seller} from "../../../lib/types";

export const userResolvers: IResolvers = {
  Mutation: {
    signUp: async (
        _root: undefined,
        {input}: SignUpArgs,
        { req, res }: { req: Request; res: Response }
    ): Promise<Seller> => {
      try {
        const {email, password, firstName, lastName} = input;
        const user: IUserModel | null = await User.findOne({email});

        if (user) {
          throw new Error('User with this email already been registered!');
        }

        const token = crypto.randomBytes(16).toString("hex");
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser:IUserModel | null = await User.create({
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

        return {
          ...newUser.toObject(),
          didRequest: true
        };
      } catch (error) {
        throw new Error(`Failed to sign up: ${error}`);
      }
    },

    signIn: async (
        _root: undefined,
        { input }: SignInArgs,
        { req, res }: { req: Request; res: Response }
    ): Promise<Seller> => {

      try {
        const newToken = crypto.randomBytes(16).toString("hex");

        const user: IUserModel | null = input?.email && input?.password ?
            await signInViaEmailAndPassword(newToken, input.email, input.password, req, res)
            : await logInViaCookie(newToken, req, res);

        if(!user){
          return { didRequest: true }
        }

        return {
          ...user.toObject(),
          didRequest: true
        }
      } catch (error) {
        throw new Error(`Failed to sign in: ${error}`);
      }
    },

    signOut: (_root: undefined, _args: unknown, { res }: { res: Response }): Seller => {
      try {
        res.clearCookie("user", config.cookieOptions);
        return { didRequest: true }
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    },

  }
};

const logInViaCookie = async (
    token: string,
    req: Request,
    res: Response
): Promise<IUserModel | null> => {
  const user: IUserModel | null = await User.findOne({ _id: req.signedCookies.user });

  if (!user) {
    res.clearCookie("user", config.cookieOptions);
    return user;
  }

  user.token = token;
  await user.save()

  return user;
};

const signInViaEmailAndPassword = async (
    token: string,
    email: string,
    password: string,
    req: Request,
    res: Response
): Promise<IUserModel | null> => {

  const user: IUserModel | null = await User.findOne({email});

  if (!user) {
    throw new Error('Incorrect email or password!');
  }
  const validPassword = await user.checkPassword(password);

  if (!validPassword) {
    throw new Error('Incorrect email or password!');
  }

  user.token = token;
  await user.save();

  res.cookie("user", user._id, {
    ...config.cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000
  });

  return user;
}
