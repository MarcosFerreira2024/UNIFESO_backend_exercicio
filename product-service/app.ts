import express from "express"

import helmet from "helmet";

import cors from "cors";
import { product_routes } from "./routes/route";


export const product_app = express()

product_app.use(express.json())

product_app.use(helmet())

product_app.use(cors({
    origin:"*",
}))

product_app.use(product_routes)
