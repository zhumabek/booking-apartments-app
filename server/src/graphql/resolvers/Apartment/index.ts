import { Request, Response } from "express";
import { IResolvers } from "apollo-server-express";
import {ApartmentInputArgs, GetApartmentsData, GetApartmentsInputArgs} from "./types";
import {IApartment} from "../../../lib/types";
import {IApartmentModel} from "../../../models";
import Apartment from "../../../models/Apartment";
import {Cloudinary} from "../../../lib/api/Cloudinary";
import {authorize} from "../../../lib/utils";


export const apartmentResolvers: IResolvers = {
  Mutation: {
      apartment: async (
          _root: undefined,
          {input}: ApartmentInputArgs,
          { req, res }: { req: Request; res: Response }
      ): Promise<IApartment> => {

        try {

          await authorize(req);

          const {name, description, numOfRooms, price, image } = input;
          const owner = req.signedCookies.user;

          const existingApartment: IApartmentModel | null = await Apartment.findOne({ name, owner });

          if(existingApartment){
            throw new Error('Apartment with this name already exists!');
          }

          const uploadedImg = await Cloudinary.upload(image);

          const newApartment = await Apartment.create({
            name,
            description,
            numOfRooms,
            price,
            image: uploadedImg.url,
            imagePublicId: uploadedImg.publicId,
            owner
          });

          return { ...newApartment.toObject() }
        } catch (e) {
          console.log(e);
          throw Error(e.message);
        }
      }
  },

  Query: {
    getApartments: async (
        _root: undefined,
        { limit, page }: GetApartmentsInputArgs,
        { req }: { req: Request }
    ): Promise<GetApartmentsData> => {

      try {

        await authorize(req);

        const apartments: IApartmentModel[] =
            await Apartment
                .find({ owner: req.signedCookies.user })
                .skip(page > 0 ? (page - 1) * limit : 0).limit(limit);

        const total = await Apartment.count({owner: req.signedCookies.user});

        return {
          total,
          result: apartments
        };
      } catch (e) {
        console.log(e);
        throw Error(e.message);
      }
    }
  },
}