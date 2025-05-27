import { Response, Request } from "express";
import z from "zod";
import { OrderModel } from "../model/OrderModel";
import { verifyJWT } from "../services/VerifyJWT";
import { UserServices } from "../services/UserServices";

export class OrderController {
  static async register(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(400).json({ message: "Token nao foi informado" });

    const verify = verifyJWT(token as string);

    if (verify instanceof Error)
      return res.status(400).json({ message: verify.message });

    const schema = z.object({
      id_produto: z.number().min(1, "Id do produto precisa ser maior que 0"),
      quantidade: z.number().min(1, "Quantidade precisa ser maior que 0"),
    });

    const parsedData = schema.safeParse(req.body);

    if (parsedData.error) {
      return res.status(400).json({
        message: parsedData.error.issues[0].message,
      });
    }
    try {
      const order = await OrderModel.register({
        email_user: verify as string,
        id_produto: parsedData.data.id_produto,
        quantidade: parsedData.data.quantidade,
      });

      if (order instanceof Error) throw new Error(order.message);
      return res.status(200).json({
        order,
      });
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({
          message: e.message,
        });
      } else {
        return res.status(500).json({
          message: "Ocorreu um Erro ao Criar o Produto",
        });
      }
    }
  }
  static async getAll(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token)
        return res.status(400).json({ message: "Token nao foi informado" });

      const verify = verifyJWT(token as string);

      if (verify instanceof Error)
        return res.status(400).json({ message: verify.message });

      const user = await UserServices.findUserByEmail(verify as string);

      if (user instanceof Error) throw new Error(user.message);

      return res.status(200).json(user.pedidos);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({
          message: e.message,
        });
      } else {
        return res.status(500).json({
          message: "Ocorreu um Erro ao Buscar os Pedidos",
        });
      }
    }
  }
}
