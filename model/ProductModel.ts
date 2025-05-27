import { prisma } from "../prisma/prisma_client";
import { Prisma } from "../generated/prisma";
import { ProductServices } from "../services/ProductServices";

export class ProductModel {
  static async register(
    data: Prisma.ProdutosCreateInput
  ): Promise<{ message: string } | string> {
    try {
      const finded = await prisma.produtos.findFirst({
        where: {
          nome: data.nome,
        },
      });

      if (finded) {
        throw new Error("Produto já existente");
      }
      const createdProduct = await prisma.produtos.create({
        data,
      });

      if (createdProduct) {
        return {
          message: `Produto ${data.nome} de ${(data.preco / 100).toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
          )} reais e estoque de ${data.estoque} foi criado com sucesso`,
        };
      } else {
        throw new Error("Ocorreu um Erro ao Criar o Produto");
      }
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      } else {
        return "Ocorreu um Erro ao Criar o Produto";
      }
    }
  }

  static async getOne(id: string): Promise<
    | {
        data: {
          id: number;
          estoque: number;
          nome: string;
          preco: number;
        };
      }
    | string
  > {
    try {
      const finded = await ProductServices.findProductById(Number(id));
      if (finded instanceof Error) throw new Error(finded.message);

      return {
        data: {
          id: finded.id,
          estoque: finded.estoque,
          nome: finded.nome,
          preco: finded.preco,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return "Ocorreu um Erro ao Criar o Produto";
      }
    }
  }
  static async getAll(): Promise<
    | {
        data: {
          id: number;
          estoque: number;
          nome: string;
          preco: number;
        }[];
      }
    | string
  > {
    try {
      const finded = await prisma.produtos.findMany({
        select: {
          id: true,
          estoque: true,
          nome: true,
          preco: true,
          descricao: true,
          imagem: true,
        },
      });
      if (finded) {
        return { data: finded };
      } else {
        throw new Error("Produto não foi encontrado");
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return "Ocorreu um Erro ao Criar o Produto";
      }
    }
  }
}
