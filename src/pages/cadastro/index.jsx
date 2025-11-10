
import './index.scss';
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";

export default function Cadastro() {
    const navigate = useNavigate();


    async function Cadastrado() {
  const usuario = document.querySelector('input[placeholder="usuario123"]').value;
  const email = document.querySelector('input[placeholder="exemplo.123@gmail.com"]').value;
  const senha = document.querySelector('input[placeholder="senha"]').value;
  const servico = document.getElementById('role').value;

  try {
    const response = await fetch("http://localhost:5000/usuarios/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, email, senha, servico })
    });

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem("usuario", JSON.stringify({
        id: data.id,
        usuario,
        email,
        servico
      }));



        Swal.fire({
          icon: "success",
          title: "Cadastro concluído!",
          text: "Bem-vindo à ZoneWork!",
          confirmButtonColor: "#1100FF"
        }).then(() => {

          if (servico === "empresa") {
            navigate("/empregador");
          } else {
            navigate("/perfil");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar!",
          text: data.error || data.message,
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
    }
  }




    return (
        <div className='pagina-cadastro pagina'>
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
        
        <div className='secao'>
            <h1>Cadastro</h1>
            
            <h3>Usuário:</h3>
            <input type="text" placeholder="usuario123"/> <br />
            <h3>Email:</h3>
            <input type="email" placeholder="exemplo.123@gmail.com"/> <br />
            <h3>Senha:</h3>
            <input type="password" placeholder="senha" /> <br />
            <h3>Serviço:</h3>
            <select id="role">
                <option value="candidato">Candidato</option>
                <option value="empresa">Empresa</option>
            </select> <br />

            <p>Já possui cadastro? <Link to="/entrar" className='botao-entrar'>Entrar</Link></p> <br />

            <button onClick={Cadastrado}  className='botao-cadastrar'>Cadastar</button>

        </div>

        </div>
    )
}