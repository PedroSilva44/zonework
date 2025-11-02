
import './index.scss';
import { Link } from 'react-router-dom';

export default function Vagas() {
  return (
    <div className="pagina-vagas pagina">
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
        <h1>Buscar Vagas</h1>

        <p>Página de vagas em desenvolvimento...</p>
      </section>
    </div>
  );
}