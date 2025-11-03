import './index.scss';
import { Link } from 'react-router-dom';
 
export default function Inicio() {

    return(
      <div className="pagina-inicio pagina">
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

        <section className='secao'>
          <div className="conteudo-texto">
            <h1>
              Cadastre-se e descubra novas <br /> oportunidades no ZoneWork!
            </h1>
            <p>Encontre as melhores oportunidades de trabalho e conecte-se com profissionais</p>
            <div className="botoes-acao">
              <Link to="/cadastro" className="botao botao-cadastro">
                Cadastrar
              </Link>
              <Link to="/login" className="botao botao-login">
                Entrar
              </Link>
            </div>
          </div>

          <div className="imagem-ilustrativa">
            <img src="./ZoneWork.png" alt="imagem ilustrativa do ZoneWork" />
          </div>
        </section>
      </div>
    )
}