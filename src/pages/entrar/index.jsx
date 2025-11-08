
import './index.scss';
import { Link } from 'react-router-dom';

export default function Entrar() {


    function Entrou() {
        alert("Você entrou em sua conta com sucesso!")
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
        
        <div className='secao'>
            <h1>Entrar</h1>
            
            <h3>Email:</h3>
            <input type="email" placeholder="exemplo.123@gmail.com"/> <br />
            <h3>Senha:</h3>
            <input type="password" placeholder="senha" /> <br />

            <p>Não possui cadastro? <Link to="/cadastro" className='botao-cadastro'>Cadastrar</Link></p> <br />

            <button className='botao-entrar' onClick={Entrou}>Entrar</button>

        </div>

        </div>
    )
}