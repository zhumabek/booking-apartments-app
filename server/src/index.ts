require("dotenv").config();

import {connectDatabase} from "./database";
import express, { Application } from "express";

const mount = async (app: Application) => {
    await connectDatabase();
    app.listen(process.env.PORT);

    console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());