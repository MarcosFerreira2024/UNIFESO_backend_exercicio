import { Response, Request } from "express";
import z from "zod";
import { ProductModel } from "../model/ProductModel";

export class ProductController {
  static async register(req: Request, res: Response) {
    const schema = z.object({
      nome: z
        .string()
        .min(2, "Nome precisa ter no minimo 2 caracteres")
        .max(64),
      preco: z.number().min(1, "Preco precisa ser maior que 0"),
      estoque: z.number(),
      descricao: z.string().min(2, "Descricao precisa ter no minimo 2 caracteres").max(36, "Descricao precisa ter no maximo 36 caracteres"),
      imagem: z.string().url("Insira uma url valida"),
    });

    const parsedData = schema.safeParse(req.body);

    console.log(req.body)

    if (parsedData.error) {
      return res.status(400).json({
        message: parsedData.error.issues[0].message,
      });
    }
    try {
      const product = await ProductModel.register(parsedData.data);

      if (product instanceof Object) {
        return res.status(200).json({
          message: product.message,
        });
      } else {
        throw new Error(product);
      }
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
  static async getAll(res: Response) {
    try {
      const finded = await ProductModel.getAll();

      if (finded instanceof Object) {
        return res.status(200).json(finded.data);
      } else {
        throw new Error(finded);
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({
          message: e.message,
        });
      } else {
        return res.status(500).json({
          message: "Ocorreu um Erro ao Buscar os Produtos",
        });
      }
    }
  }
  static async getOne(req: Request, res: Response) {
    if (!req.params.id)
      return res.status(400).json({ message: "Id nao foi informado" });
    if (+req.params.id < 0)
      return res
        .status(400)
        .json({ message: "Id nao pode ser um número negativo" });

    try {
      const finded = await ProductModel.getOne(req.params.id);

      if (finded instanceof Object) {
        return res.status(200).json(finded.data);
      } else {
        throw new Error(finded);
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({
          message: e.message,
        });
      } else {
        return res.status(500).json({
          message: "Ocorreu um Erro ao Buscar o Produto",
        });
      }
    }
  }
}
