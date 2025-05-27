import express from "express";

import helmet from "helmet";

import cors from "cors";
import { order_routes } from "./routes/route";

export const order_app = express();

order_app.use(express.json());

order_app.use(helmet());

order_app.use(
  cors({
    origin: "*",
  })
);



order_app.use(order_routes);
