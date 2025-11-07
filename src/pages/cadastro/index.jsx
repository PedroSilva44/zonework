
import './index.scss';
import { Link } from 'react-router-dom';

export default function Cadastro() {


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
            <br />
            <h3>Usuário:</h3>
            <input type="text" placeholder="usuario123"/> <br />
            <h3>Email:</h3>
            <input type="email" placeholder="exemplo.123@gmail.com"/> <br />
            <h3>Senha:</h3>
            <input type="password" placeholder="senha" /> <br />

            <button className='botao-cadastrar'>Cadastar</button>

        </div>

        </div>
    )
}