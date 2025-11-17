const API_BASE_URL = 'http://localhost:3044';

export const authService = {
  async cadastrar(dados) {
    const response = await fetch(`${API_BASE_URL}/usuarios/cadastrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    return await response.json();
  },

  async entrar(dados) {
    const response = await fetch(`${API_BASE_URL}/usuarios/entrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    return await response.json();
  },

  async verificarToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/usuarios/verificar`, {
      headers: { 
        "Content-Type": "application/json",
        "x-access-token": token
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
    return null;
  }
};

// Função para verificar se usuário está autenticado
export function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

// Função para fazer logout
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = '/entrar';
}