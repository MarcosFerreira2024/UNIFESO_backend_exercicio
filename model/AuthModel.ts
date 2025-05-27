import * as JWT from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Prisma } from "../generated/prisma"
import { prisma } from "../prisma/prisma_client"


export class AuthModel{




    static async register(data:Prisma.UserCreateInput):Promise<{message:string}|string>{
        
        try {
            const finded = await prisma.user.findUnique({
                where:{
                    email:data.email
                }
            })

            if(finded){
                throw new Error ("Usuário já existente")
            }


            const createdUser = await prisma.user.create({
                data:{
                    email:data.email,
                    nome:data.nome,
                    senha:bcrypt.hashSync(data.senha,12)
                }
            })

            if(createdUser){
                return {
                    message: `Usuário ${data.nome} foi criado com sucesso`

                }
            }else{
                return "Ocorreu um Erro ao Criar o Usuário"
            }

        }catch(e){

            if( e instanceof Error ){
                return e.message 
            }
            else{
                return "Ocorreu um Erro ao Criar o Usuário"
            }

        }
        




    }

    static async login(data:{email:string,senha:string}):Promise<{message:string}|string>{
        try {
            const finded = await prisma.user.findFirst({
                where:{
                    email:data.email
                },
                select:{
                    email:true,
                    senha:true
                }
            })

            if(!finded){
                throw new Error ("Usuário nao encontrado")

            }

            if(await bcrypt.compare(data.senha,finded.senha)){
                const token =  JWT.sign(finded.email,process.env.SECRET as string)

                console.log(token)
                return {
                    message:token
                }
            }else{
                throw new Error ("Senha ou Email Inválidos")
            }

        }catch(e){
            if(e instanceof Error){
                return e.message
            }else{
                return "Ocorreu um Erro ao logar"
            }
        }
    }
}