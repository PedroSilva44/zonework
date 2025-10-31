
import './index.scss';
import { Link } from 'react-router-dom';

export default function Bicos() {
  return (
    <div className="pagina-bicos pagina">
      <header className='cabecalho'>
        <Link to="/" className="logo-link">
          <h1 className='titulo1'> 
            ZoneWork 
            <i className='fa fa-briefcase'></i>
          </h1>
        </Link>
      </header>

      <section className='secao'>
        <h1>Bicos e Freelas</h1>
        <p>Página de bicos e freelas em desenvolvimento...</p>
      </section>
    </div>
  );
}