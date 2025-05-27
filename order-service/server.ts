import { ORDER_SERVICE_PORT } from "../consts/consts";
import { order_app } from "./app";




order_app.listen(ORDER_SERVICE_PORT, () => {
  console.log(
    `Serviço de Pedidos rodando na porta http://localhost:${ORDER_SERVICE_PORT}`
  );
});
