import { Request, Response } from "express";
import { IResolvers } from "apollo-server-express";
import {ApartmentTimeSlotsQueryInputArgs} from "./types";
import {IApartment, IApartmentTimeSlot} from "../../../lib/types";
import {IApartmentModel, IApartmentTimeSlotModel} from "../../../models";
import ApartmentTimeSlot from "../../../models/ApartmentTimeSlot";


export const apartmentTimeSlotResolvers: IResolvers = {
  Query: {
      apartmentTimeSlots: async (
          _root: undefined,
          {id }: ApartmentTimeSlotsQueryInputArgs
      ): Promise<IApartmentTimeSlot[]> => {

        try {
          const timeSlots: IApartmentTimeSlotModel[] = await ApartmentTimeSlot.find({ apartmentId: id });

          return timeSlots;
        } catch (e) {
          console.log(e);
          throw Error(e.message);
        }
      }
  }
}