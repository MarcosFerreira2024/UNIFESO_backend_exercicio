import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";
import { AUTH_SERVICE_PORT, ORDER_SERVICE_PORT, PRODUCT_SERVICE_PORT } from "../consts/consts";

const gateway = express();


gateway.use(
  "/auth",
  createProxyMiddleware({
    target: `http://localhost:${AUTH_SERVICE_PORT}`,
    changeOrigin: true,
  })
);
gateway.use(
  "/order", 
  createProxyMiddleware({
    target: `http://localhost:${ORDER_SERVICE_PORT}/order`, 
    changeOrigin: true,

  })
);
gateway.use(
  "/orders", 
  createProxyMiddleware({
    target: `http://localhost:${ORDER_SERVICE_PORT}/orders`, 
    changeOrigin: true,

  })
);
gateway.use(
  "/product",
  createProxyMiddleware({
    target: `http://localhost:${PRODUCT_SERVICE_PORT}`,
    changeOrigin: true,
  })
);
gateway.use(
  "/products",
  createProxyMiddleware({
    target: `http://localhost:${PRODUCT_SERVICE_PORT}`,
    changeOrigin: true,
  })
);

gateway.listen(3000, () => {
  console.log("Gateway rodando na porta 3000");
});