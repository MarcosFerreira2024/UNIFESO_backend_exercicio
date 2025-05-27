import { prisma } from "../prisma/prisma_client";
import { ProductServices } from "../services/ProductServices";
import { UserServices } from "../services/UserServices";

export class OrderModel {
  static async register(data: {
    email_user: string;
    id_produto: number;
    quantidade: number;
  }) {
    try {
      const findedProduct = await ProductServices.findProductById(
        data.id_produto
      );

      if (findedProduct instanceof Error)
        throw new Error(findedProduct.message);

      if (findedProduct.estoque < data.quantidade)
        throw new Error(
          `Produto ${findedProduct.nome} esta com estoque insuficiente`
        );

      const findedUser = await UserServices.findUserByEmail(data.email_user);

      if (findedUser instanceof Error) throw new Error(findedUser.message);

      const pedidoExistente = findedUser.pedidos.find(
        (pedido) => pedido.produto.id === data.id_produto
      );

      if (pedidoExistente) {
        await prisma.produtos.update({
          where: {
            id: data.id_produto,
          },
          data: {
            estoque: {
              decrement: data.quantidade,
            },
          },
        });

        const order = await prisma.pedidos.update({
          where: {
            id: pedidoExistente.id,
            userId: findedUser.id,
            produtoId: data.id_produto,
          },
          data: {
            quantidade: {
              increment: data.quantidade,
            },
          },
        });
        return order;
      } else {
        const order = await prisma.pedidos.create({
          data: {
            quantidade: data.quantidade,
            produtoId: data.id_produto,
            userId: findedUser.id,
          },
        });

        return order;
      }
    } catch (e) {
      if (e instanceof Error) {
        return new Error(e.message);
      } else {
        return new Error("Ocorreu um Erro ao Criar o Pedido");
      }
    }
  }

}
