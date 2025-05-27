import { prisma } from "../prisma/prisma_client"

export class UserServices {

    static async findUserByEmail(email:string):Promise<{email:string,pedidos:{id:number,quantidade:number,produto:{id:number,nome:string,preco:number,descricao:string,estoque:number,imagem:string}}[],nome:string,id:number}|Error>{
        try {
            const user = await prisma.user.findUnique({
                where:{email},
                include:{
                    pedidos:
                    {
                        include:
                        {
                            produto:{
                                select:
                                {
                                    id:true,
                                    nome:true,
                                    preco:true,
                                    descricao:true,
                                    estoque:true,
                                    imagem:true
                                    
                                }
                            }}
                        }
                    },
            })

            if(user) return user
            throw new Error("Usuário não encontrado")
        } catch (error) {
            if( error instanceof Error ){
                return new Error(error.message)
            }
            else{
                return new Error("Ocorreu um Erro ao Buscar o Usuário")
            }
        }
        }
    





}