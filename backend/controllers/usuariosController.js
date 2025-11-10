import express from "express";
import * as repo from "../repositories/usuariosRepository.js";

const api = express.Router();


// ---------- Cadastro de novo usuário -----------
api.post("/cadastrar", async (req, res) => {
  try {
    const { usuario, email, senha, servico } = req.body;

    if (!usuario || !email || !senha || !servico)
      return res.status(400).send({ error: "Preencha todos os campos!" });

    const id = await repo.criarUsuario(usuario, email, senha, servico);
    res.status(201).send({ message: "Usuário cadastrado com sucesso!", id });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ error: "Usuário ou e-mail já cadastrados!" });
    }
    res.status(500).send({ error: "Erro no servidor: " + err.message });
  }
});


// ------- Atualização do perfil ----------
api.put("/perfil/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    if (!id) return res.status(400).send({ error: "ID do usuário é obrigatório!" });

    const linhasAfetadas = await repo.atualizarUsuario(id, dados);

    if (linhasAfetadas === 0)
      return res.status(404).send({ error: "Usuário não encontrado." });

    res.status(200).send({ message: "Perfil atualizado com sucesso!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// ---------- Buscar informações -----------
api.get("/perfil/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await repo.buscarUsuarioPorId(id);
    if (!usuario) return res.status(404).send({ error: "Usuário não encontrado." });

    res.send(usuario);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});




export default api;
