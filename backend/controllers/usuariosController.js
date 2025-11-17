import express from "express";
import * as repo from "../repositories/usuariosRepository.js";
import { generateToken, getAuthentication } from "../utils/jwt.js";

const api = express.Router();


// ---------- Cadastro de novo usuário -----------
api.post("/cadastrar", async (req, res) => {
  try {
    const { usuario, email, senha, servico } = req.body;

    if (!usuario || !email || !senha || !servico)
      return res.status(400).send({ error: "Preencha todos os campos!" });

    const id = await repo.criarUsuario(usuario, email, senha, servico);

    // Gerar token JWT após cadastro
    const token = generateToken({
      id: id,
      usuario: usuario,
      email: email,
      servico: servico
    });

    // Retornar formato compatível com o frontend
    res.status(201).send({
      message: "Usuário cadastrado com sucesso!",
      token,
      usuario: {
        id,
        usuario,
        email,
        servico
      }
    });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ error: "Usuário ou e-mail já cadastrados!" });
    }
    res.status(500).send({ error: "Erro no servidor: " + err.message });
  }
});

// ---------- Login de usuário -----------
api.post("/entrar", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha)
      return res.status(400).send({ error: "Email e senha são obrigatórios!" });

    const usuario = await repo.entrarUsuario(email, senha);

    // Gerar token JWT
    const token = generateToken({
      id: usuario.id,
      usuario: usuario.usuario,
      email: usuario.email,
      servico: usuario.servico
    });

    res.send({
      message: "Login realizado com sucesso!",
      token: token,
      usuario: usuario
    });

  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

// ------- Atualização do perfil ----------
api.put("/perfil/:id", getAuthentication(), async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    if (!id) return res.status(400).send({ error: "ID do usuário é obrigatório!" });

    // Verificar se o usuário tem permissão para atualizar este perfil
    // req.user.id pode ser number or string, padronizamos para string para comparar
    if (String(req.user.id) !== String(id) && req.user.servico !== 'empresa') {
      return res.status(403).send({ error: "Sem permissão para atualizar este perfil!" });
    }

    const linhasAfetadas = await repo.atualizarUsuario(id, dados);

    if (linhasAfetadas === 0)
      return res.status(404).send({ error: "Usuário não encontrado." });

    res.status(200).send({ message: "Perfil atualizado com sucesso!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// ---------- Buscar informações -----------
// Agora protegida: exige autenticação
api.get("/perfil/:id", getAuthentication(), async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await repo.buscarUsuarioPorId(id);
    if (!usuario) return res.status(404).send({ error: "Usuário não encontrado." });

    // Remover senha do objeto de retorno (se existir)
    const { senha, ...usuarioSemSenha } = usuario;

    res.send(usuarioSemSenha);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ---------- Verificar token (rota protegida) -----------
api.get("/verificar", getAuthentication(), async (req, res) => {
  try {
    const usuario = await repo.buscarUsuarioPorId(req.user.id);

    if (!usuario) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }

    // Remover senha do objeto de retorno
    const { senha, ...usuarioSemSenha } = usuario;

    res.send({ usuario: usuarioSemSenha });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default api;

