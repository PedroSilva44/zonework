
import './index.scss';
import { Link } from 'react-router-dom';

export default function NaoEncontrado() {
  return (
    <div className="pagina-nao-encontrado pagina">
      <header className='cabecalho'>
        <h1 className='titulo1'> 
          ZoneWork 
          <i className='fa fa-briefcase'></i>
        </h1>
      </header>

      <section className='secao'>
        <h1>Página Não Encontrada</h1>
        <p>Desculpe, a página que você está procurando não existe.</p>
        
        <div className="voltar-home">
          <Link to="/" className='btn-primario'>
            ← Voltar para Home
          </Link>
        </div>
      </section>
    </div>
  );
}