import { Request, Response } from "express";
import { IResolvers } from "apollo-server-express";
import {ApartmentInputArgs} from "./types";
import {IApartment} from "../../../lib/types";
import {IApartmentModel} from "../../../models";
import Apartment from "../../../models/Apartment";


export const apartmentResolvers: IResolvers = {
  Mutation: {
      apartment: async (
          _root: undefined,
          {input}: ApartmentInputArgs,
          { req, res }: { req: Request; res: Response }
      ): Promise<IApartment> => {

        const {name, description, numOfRooms, price, image, timeSlots } = input;
        const owner = req.signedCookies.user;

        const existingApartment: IApartmentModel | null = await Apartment.findOne({ name, owner });

        if(existingApartment){
          throw new Error('Apartment with this name already exists!');
        }

        const newApartment = await Apartment.create({
          name,
          description,
          numOfRooms,
          price,
          image,
          imagePublicId: "",
          owner
        })

        return {
          ...newApartment.toObject(),
          timeSlots: []
        }
      }
  }
}