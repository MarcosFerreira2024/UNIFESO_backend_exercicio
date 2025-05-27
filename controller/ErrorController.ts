import { Request, Response } from "express";

export class ErrorController {



    public static notFound(req: Request, res: Response) {
        res.status(404).json({ message: "Rota nao encontrada" });
    }

}