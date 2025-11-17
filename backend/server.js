import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosController from "./controllers/usuariosController.js";
import connection from "./database/connection.js";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const PORT2 = process.env.PORT || 3044;


const app = express();


app.use(cors());
app.use(express.json());


// ---- Testar conexão com o banco
try {
// Para pools, getConnection() funciona — aqui apenas testamos a conexão
await connection.getConnection();
console.log("✅ Conectado ao MySQL com sucesso!");
} catch (err) {
console.log("❌ Erro ao conectar com MySQL:", err.message);
}


// ---- Rotas
app.use("/usuarios", usuariosController);


// ---- Rota de health check
app.get("/health", (req, res) => {
res.send({ status: "OK", message: "API ZoneWork rodando!" });
});


app.listen(PORT2, () => {
console.log(`✅ Servidor rodando na porta ${PORT2}`);
});




/*
Observações:
- FRONTEND_URL pode ser configurado no .env (FRONTEND_URL=http://localhost:3000)
- PORT pode ser configurado no .env
*/

