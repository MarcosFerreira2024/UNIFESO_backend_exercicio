import express from "express"
import helmet from "helmet"
import cors from "cors"


export const gateway = express ()

gateway.use(express.json())
gateway.use(helmet())
gateway.use(
    cors({
        origin:"*",
    })
)

