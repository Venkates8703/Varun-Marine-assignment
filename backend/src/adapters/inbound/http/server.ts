import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routesController";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Server running on ${port}`));
