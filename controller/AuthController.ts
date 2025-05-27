import { Response, Request } from "express";
import z from "zod";
import { AuthModel } from "../model/AuthModel";
import { verifyJWT } from "../services/VerifyJWT";

export class AuthController {


  static async verify (req: Request, res: Response) {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token){
        return res.status(400).json({ message: "Token nao foi informado" });
      }
      try {
        const verify = verifyJWT(token as string);

        if (verify instanceof Error){
          throw new Error (verify.message)
        }

        return res.status(200).json({message: "Token Valido"})
      }
      catch(e){
        if(e instanceof Error){
          return res.status(400).json({ message: e.message });
        }
        else{
          return res
          .status(400)
          .json({ message: "Ocorreu um Erro ao Verificar o Token" });
        }

      }
  }

  


  static async register(req: Request, res: Response) {
    const schema = z.object({
      nome: z
        .string()
        .min(2, "Nome precisa ter no minimo 2 caracteres")
        .max(64),
      email: z.string().email("Insira um email válido"),
      senha: z.string().min(6, "Senha precisa ter no minimo 6 caracteres"),
    });

    const parsedData = schema.safeParse(req.body);

    if (parsedData.error) {
      return res.status(400).json({
        message: parsedData.error.issues[0].message,
      });
    }
    try {
      const createdUser = await AuthModel.register(parsedData.data);

      if (createdUser instanceof Object) {
        return res.status(200).json({
          message: createdUser.message,
        });
      } else {
        throw new Error(createdUser);
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({ message: e.message });
      } else {
        return res
          .status(400)
          .json({ message: "Ocorreu um Erro ao Criar o Usuário" });
      }
    }
  }

  static async login(req: Request, res: Response) {
    const schema = z.object({
      email: z.string().email("Insira um email válido"),
      senha: z.string().min(6, "Senha precisa ter no minimo 6 caracteres"),
    });

    const parsedData = schema.safeParse(req.body);


    if (parsedData.error) {
      return res.status(400).json({
        message: parsedData.error.issues[0].message,
      });
    }

    try {
      const userToken = await AuthModel.login(parsedData.data);

      if (userToken instanceof Object) {
        return res.status(200).json({ token: userToken.message });
      } else {
        throw new Error(userToken);
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({ message: e.message });
      } else {
        return res
          .status(400)
          .json({ message: "Ocorreu um Erro ao Logar o Usuário" });
      }
    }
  }
}
