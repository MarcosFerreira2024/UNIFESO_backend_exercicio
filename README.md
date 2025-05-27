# 🧠 Backend – Exercício da Aula de Desenvolvimento Backend (UNIFESO)

Este projeto representa o **backend** do exercício proposto na aula de **Desenvolvimento Backend** da UNIFESO.

O sistema está dividido em **microserviços** (auth, product, order) e um **API Gateway**, todos escritos em **TypeScript**, com gerenciamento de banco via **Prisma ORM** e banco de dados **SQLite**.

---

## ⚙️ Tecnologias Utilizadas

- Node.js + Express
- TypeScript 
- Prisma ORM + SQLite
- JWT para autenticação
- Bcrypt para hash de senhas
- HTTP Proxy Middleware (API Gateway)
- Helmet + CORS para segurança
- Zod para validação de dados
- Concurrently (execução simultânea de serviços)

---

## 🚀 Como Instalar e Rodar o Projeto

### 1. Clone os Repositórios do frontend e do backend

```bash
git clone https://github.com/MarcosFerreira2024/exercicio_unifeso_backend.git
cd exercicio_unifeso_backend

```bash
git clone https://github.com/MarcosFerreira2024/UNIFESO_frontend.git
git clone https://github.com/MarcosFerreira2024/UNIFESO_backend_exercicio.git

cd UNIFESO_frontend
cd UNIFESO_backend_exercicio
```

### 2. Instale as dependências em cada um dos projetos

npm install 

### 3. Rode os projetos 

npm run dev 

### 4. Abra seu navegador e coloque o localhost

http://localhost:5173/
