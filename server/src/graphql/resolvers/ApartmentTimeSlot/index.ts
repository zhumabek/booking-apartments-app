import { IResolvers } from "apollo-server-express";
import {ApartmentTimeSlotsQueryInputArgs, EditApartmentTimeSlotInputArgs} from "./types";
import {IApartmentTimeSlot} from "../../../lib/types";
import {IApartmentTimeSlotModel} from "../../../models";
import ApartmentTimeSlot from "../../../models/ApartmentTimeSlot";
import {authorize} from "../../../lib/utils";
import {Request} from "express";


export const apartmentTimeSlotResolvers: IResolvers = {
  Query: {
      apartmentTimeSlots: async (
          _root: undefined,
          {id }: ApartmentTimeSlotsQueryInputArgs,
          { req }: { req: Request }
      ): Promise<IApartmentTimeSlot[]> => {

        try {

            await authorize(req);

            const timeSlots: IApartmentTimeSlotModel[] = await ApartmentTimeSlot.find({ apartmentId: id });

          return timeSlots;
        } catch (e) {
          console.log(e);
          throw Error(e.message);
        }
      }
  },

  Mutation: {
      editApartmentTimeSlot: async (
          _root: undefined,
          { input }: EditApartmentTimeSlotInputArgs,
          { req }: { req: Request }
      ): Promise<IApartmentTimeSlot> => {

        try {
           await authorize(req);
           
          if(input._id && input.apartmentId){
              const timeSlot: IApartmentTimeSlotModel | null = await ApartmentTimeSlot.findOneAndRemove({ _id: input._id });

              if(!timeSlot){
                  throw new Error('TimeSlot not found!');
              }

              return timeSlot;
          }

          const newTimeSlot = await ApartmentTimeSlot.create({
              date: input.date,
              isBooked: input.isBooked,
              apartmentId: input.apartmentId
          });

          return newTimeSlot;
        } catch (e) {
          console.log(e);
          throw Error(e.message);
        }
      }
  }
}