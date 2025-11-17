import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from "sweetalert2";

export default function Entrar() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Estado para os campos do formulário
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    // Função para atualizar os campos
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function Entrou(e) {
        e.preventDefault();
        
        const { email, senha } = formData;

        if (!email || !senha) {
            Swal.fire({
                icon: "warning",
                title: "Campos obrigatórios!",
                text: "Preencha email e senha para continuar.",
                confirmButtonColor: "#1100FF"
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5010/usuarios/entrar", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            // Definir data ANTES de usar
            const data = await response.json();

            if (response.ok) {
                // Salvar token e dados do usuário no localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                Swal.fire({
                    icon: "success",
                    title: "Login realizado!",
                    text: `Bem-vindo de volta, ${data.usuario.usuario}!`,
                    confirmButtonColor: "#1100FF"
                }).then(() => {
                    if (data.usuario.servico === "empresa") {
                        navigate("/empregador");
                    } else {
                        navigate("/perfil");
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao entrar!",
                    text: data.error || "Credenciais inválidas.",
                    confirmButtonColor: "#d33"
                });
            }
        } catch (err) {
            let errorMessage = "Não foi possível conectar ao servidor";
            if (err.message.includes('Failed to fetch')) {
                errorMessage = "Servidor não está respondendo. Verifique se o backend está rodando na porta 5010";
            } else {
                errorMessage = err.message;
            }

            Swal.fire({
                icon: "error",
                title: "Erro de conexão!",
                text: errorMessage,
                confirmButtonColor: "#d33"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='pagina-entrar pagina'>
            <header className='cabecalho'>
                <div className='card-logo'>
                    <img src="./zonework1.png" alt='logo do zonework'/>
                </div>
                <Link to='/' className='logo-link'>
                    <h1 className='titulo1'> 
                        ZoneWork
                    </h1>
                </Link>
            </header>
            
            <form className='secao' onSubmit={Entrou}>
                <h1>Entrar</h1>
                
                <div className="campo-form">
                    <h3>Email:</h3>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="exemplo.123@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="campo-form">
                    <h3>Senha:</h3>
                    <input 
                        type="password" 
                        name="senha"
                        placeholder="senha"
                        value={formData.senha}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <p>Não possui cadastro? <Link to="/cadastro" className='botao-cadastro'>Cadastrar</Link></p>

                <button 
                    type="submit"
                    className='botao-entrar'
                    disabled={loading}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    )
}