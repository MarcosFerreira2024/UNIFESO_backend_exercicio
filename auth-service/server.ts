import { AUTH_SERVICE_PORT } from "../consts/consts";
import { auth_app } from "./app";


auth_app.listen(AUTH_SERVICE_PORT, () => {
    console.log(`Serviço de Autenticação rodando na porta http://localhost:${AUTH_SERVICE_PORT}`)
})