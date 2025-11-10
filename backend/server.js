import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosController from "./controllers/usuariosController.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json()); // ---- permite o uso de BODY


// Rotas
app.use("/usuarios", usuariosController);

app.listen(process.env.PORT, () => {
  console.log(`✅ Servidor rodando na porta ${process.env.PORT}`);
});
