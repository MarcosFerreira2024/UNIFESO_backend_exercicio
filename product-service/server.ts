import { PRODUCT_SERVICE_PORT } from "../consts/consts";
import { product_app } from "./app";


product_app.listen(PRODUCT_SERVICE_PORT, () => {
    console.log(`Serviço de Produtos rodando na porta http://localhost:${PRODUCT_SERVICE_PORT}`)
})