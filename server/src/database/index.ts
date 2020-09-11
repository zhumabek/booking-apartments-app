import * as mongoose from "mongoose";
import {config} from "../config";

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(config.dbUrl, config.mongoOptions)
};
