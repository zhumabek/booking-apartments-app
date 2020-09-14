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

          if(input._id) {
            
            const apartment: IApartmentModel | null = await Apartment.findById(input._id);

            if(!apartment){
              throw new Error("Apartment not found!");
            }

            if(await Apartment.findOne({ name, owner })){
              throw new Error('Apartment with this name already exists!');
            }

            if(apartment.image !== image){
              const uploadedImg = await Cloudinary.update(apartment.imagePublicId, image);
              apartment.image = uploadedImg.url;
              apartment.imagePublicId = uploadedImg.publicId;
            }

            return await apartment.save();
          }

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
      },

    deleteApartment: async (
        _root: undefined,
        { id }: { id: string },
        { req }: { req: Request }
    ): Promise<IApartment> => {

      try {
        await authorize(req);

        const apartment: IApartmentModel | null = await Apartment.findByIdAndDelete( id );
        if(!apartment){
          throw new Error("Apartment not deleted!");
        }

        return apartment
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
    },

    getApartment: async (
        _root: undefined,
        { id }: { id: string },
        { req }: { req: Request }
    ): Promise<IApartment> => {

      try {
        await authorize(req);

        const apartment: IApartmentModel | null = await Apartment.findById( id );
        if(!apartment){
          throw new Error("Apartment not found!");
        }

        return apartment
      } catch (e) {
        console.log(e);
        throw Error(e.message);
      }
    }
  },
}