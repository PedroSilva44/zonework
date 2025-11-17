import connection from "../database/connection.js";
import bcrypt from "bcryptjs";

// ----------- Criar novo usuário ------------
export async function criarUsuario(usuario, email, senha, servico) {
  const hash = await bcrypt.hash(senha, 10);

  const comando = `
    INSERT INTO usuarios (usuario, email, senha, servico)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await connection.query(comando, [usuario, email, hash, servico]);
  return result.insertId;
}

// ----------- Entrar usuário ------------
export async function entrarUsuario(email, senha) {
  // Primeiro buscar o usuário pelo email
  const comandoBuscar = `
    SELECT id, usuario, email, senha, servico
    FROM usuarios 
    WHERE email = ?
  `;

  const [usuarios] = await connection.query(comandoBuscar, [email]);

  if (usuarios.length === 0) {
    throw new Error('Email não cadastrado');
  }

  const usuario = usuarios[0];

  // Verificar senha
  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error('Senha incorreta');
  }

  // Retornar dados do usuário (sem a senha)
  return {
    id: usuario.id,
    usuario: usuario.usuario,
    email: usuario.email,
    servico: usuario.servico
  };
}

// ----------- Atualizar perfil ----------- 
export async function atualizarUsuario(id, dados) {
  const comando = `
    UPDATE usuarios
       SET nome_completo = ?,
           telefone = ?,
           localizacao = ?,
           habilidades = ?,
           nivel_experiencia = ?,
           tipo_vaga_preferida = ?,
           disponibilidade = ?,
           sobre_voce = ?
     WHERE id = ?
  `;

  // Garantir que habilidades seja um array serializável
  const habilidadesJson = Array.isArray(dados.habilidades) ? JSON.stringify(dados.habilidades) : JSON.stringify([]);

  const [result] = await connection.query(comando, [
    dados.nome_completo || null,
    dados.telefone || null,
    dados.localizacao || null,
    habilidadesJson,
    dados.nivel_experiencia || "iniciante",
    dados.tipo_vaga_preferida || "presencial",
    dados.disponibilidade || "imediata",
    dados.sobre_voce || null,
    id,
  ]);

  return result.affectedRows;
}

// ----------- Buscar dados -----------
export async function buscarUsuarioPorId(id) {
  const comando = `
    SELECT 
      id, usuario, email, servico, nome_completo, telefone, localizacao,
      habilidades, nivel_experiencia, tipo_vaga_preferida,
      disponibilidade, sobre_voce, data_criacao
    FROM usuarios
    WHERE id = ?
  `;

  const [result] = await connection.query(comando, [id]);

  if (result[0] && result[0].habilidades) {
    try {
      result[0].habilidades = JSON.parse(result[0].habilidades);
    } catch (e) {
      // Caso não seja JSON válido, retorna array vazio
      result[0].habilidades = [];
    }
  }

  return result[0];
}
