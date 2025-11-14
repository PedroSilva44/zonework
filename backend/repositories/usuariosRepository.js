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
  const comando = `
    SELECT id,
           email,
           role,
           criacao
      FROM login
     WHERE email = ?
       and senha = ?
  `;

  const [registros] = await connection.query(comando, [email, senha]);
  return registros[0];
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

  const [result] = await connection.query(comando, [
    dados.nome_completo || null,
    dados.telefone || null,
    dados.localizacao || null,
    JSON.stringify(dados.habilidades || []),
    dados.nivel_experiencia || "iniciante",
    dados.tipo_vaga_preferida || "presencial",
    dados.disponibilidade || "Imediata",
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
  return result[0];
}
