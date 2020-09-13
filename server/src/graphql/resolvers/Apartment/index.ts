import { Request, Response } from "express";
import { IResolvers } from "apollo-server-express";
import {ApartmentInputArgs} from "./types";
import {IApartment} from "../../../lib/types";
import {IApartmentModel} from "../../../models";
import Apartment from "../../../models/Apartment";
import {Cloudinary} from "../../../lib/api/Cloudinary";
import ApartmentTimeSlot from "../../../models/ApartmentTimeSlot";


export const apartmentResolvers: IResolvers = {
  Mutation: {
      apartment: async (
          _root: undefined,
          {input}: ApartmentInputArgs,
          { req, res }: { req: Request; res: Response }
      ): Promise<IApartment> => {

        try {
          const {name, description, numOfRooms, price, image, timeSlots } = input;
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

          const apartmentTimeSlots = await ApartmentTimeSlot.create([
            ...timeSlots.map(timeSlot => {
              return {...timeSlot, apartmentId: newApartment._id}
            })
          ]);

          return {
            ...newApartment.toObject(),
            timeSlots: apartmentTimeSlots
          }
        } catch (e) {
          console.log(e);
          throw Error(e.message);
        }
      }
  }
}