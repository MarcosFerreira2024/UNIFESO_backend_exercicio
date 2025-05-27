import * as JWT  from "jsonwebtoken"

export function verifyJWT(token: string) {
    
    try {
        const verify =JWT.verify(token,process.env.SECRET as string)

        return verify

    }catch (error) {
        if(error instanceof Error) return new Error("Token inválido")
        else return new Error("Token Inválido")
    }
    
}   