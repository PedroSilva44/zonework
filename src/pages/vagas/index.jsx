
import './index.scss';
import { Link } from 'react-router-dom';

export default function Vagas() {
  return (
    <div className="pagina-vagas pagina">
      <header className='cabecalho'>
        <Link to="/" className="logo-link">
          <h1 className='titulo1'> 
            ZoneWork 
            <i className='fa fa-briefcase'></i>
          </h1>
        </Link>
      </header>

      <section className='secao'>
        <h1>Buscar Vagas</h1>
        {/* Componente de busca avançada será implementado aqui */}
        <p>Página de vagas em desenvolvimento...</p>
      </section>
    </div>
  );
}