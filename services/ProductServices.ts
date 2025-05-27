import { prisma } from "../prisma/prisma_client"

export class ProductServices {

    static async findProductById(id:number):Promise<{
    id: number;
    nome: string;
    preco: number;
    estoque: number;
 }|Error>{
        try {
            const product = await prisma.produtos.findUnique({where:{id}, select:{id:true,estoque:true,nome:true,preco:true,descricao:true,imagem:true}})
            if(product) return product
            else throw new Error("Produto nao encontrado")
        }catch(e){
            if( e instanceof Error ){
                return new Error(e.message)
            }
            else{
                return new Error("Ocorreu um Erro ao Buscar o Produto")
            }
        }
    }





}