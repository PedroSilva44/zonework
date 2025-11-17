import './index.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from "sweetalert2";

export default function Cadastro() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        senha: '',
        servico: 'candidato'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function Cadastrado(e) {
        e.preventDefault();
        
        const { usuario, email, senha, servico } = formData;

        if (!usuario || !email || !senha || !servico) {
            Swal.fire({
                icon: "warning",
                title: "Campos obrigatórios!",
                text: "Preencha todos os campos para continuar.",
                confirmButtonColor: "#1100FF"
            });
            return;
        }

        if (senha.length < 6) {
            Swal.fire({
                icon: "warning",
                title: "Senha muito curta!",
                text: "A senha deve ter pelo menos 6 caracteres.",
                confirmButtonColor: "#1100FF"
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5010/usuarios/cadastrar", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // AGORA CORRETO: salve o usuário vindo do backend
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                Swal.fire({
                    icon: "success",
                    title: "Cadastro concluído!",
                    text: "Bem-vindo à ZoneWork!",
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
                    title: "Erro ao cadastrar!",
                    text: data.error || data.message || "Erro desconhecido",
                    confirmButtonColor: "#d33"
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Erro de conexão!",
                text: "Não foi possível conectar ao servidor.",
                confirmButtonColor: "#d33"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='pagina-cadastro pagina'>
            <header className='cabecalho'>
                <div className='card-logo'>
                    <img src="./zonework1.png" alt='logo' />
                </div>
                <Link to='/' className='logo-link'>
                    <h1 className='titulo1'>ZoneWork</h1>
                </Link>
            </header>

            <form className='secao' onSubmit={Cadastrado}>
                <h1>Cadastro</h1>

                <div className="campo-form">
                    <h3>Usuário:</h3>
                    <input 
                        type="text" 
                        name="usuario"
                        value={formData.usuario}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="campo-form">
                    <h3>Email:</h3>
                    <input 
                        type="email"
                        name="email"
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
                        value={formData.senha}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="campo-form">
                    <h3>Serviço:</h3>
                    <select 
                        name="servico"
                        value={formData.servico}
                        onChange={handleInputChange}
                    >
                        <option value="candidato">Candidato</option>
                        <option value="empresa">Empresa</option>
                    </select>
                </div>

                <p>Já possui cadastro? <Link to="/entrar" className='botao-entrar'>Entrar</Link></p>

                <button type="submit" className='botao-cadastrar' disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}
