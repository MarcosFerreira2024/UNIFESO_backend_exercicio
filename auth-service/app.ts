import express from "express"

import helmet from "helmet";
import cors from "cors";
import { auth_routes } from "./routes/route";


export const auth_app = express()

auth_app.use(express.json())

auth_app.use(helmet())

auth_app.use(cors({
    origin:"*",
}))

auth_app.use(auth_routes)