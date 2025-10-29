
import './index.scss';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="pagina-app pagina">
      <header className='cabecalho'>
        <Link to='/' className='logo-link'>
        <h1 className='titulo1'> 
          ZoneWork 
          <i className='fa fa-briefcase'></i>
        </h1>
        </Link>
      </header>

      <section className='secao'>
        <h1> Encontre Emprego Perto de Você </h1>

        {/* Busca Rápida */}
        <input 
          type="text" 
          placeholder='Digite o cargo ou habilidade...' 
          className='campo-busca'
        />
        <br /><br />
        
        {/* Filtro de Distância */}
        <select className='filtro-distancia'>
          <option>Até 1km</option>
          <option>Até 5km</option>
          <option>Até 10km</option>
          <option>Até 20km</option>
        </select>
        <br /><br />

        {/* Botões de Ação */}
        <button className='btn-primario'>Buscar Vagas</button>
        <button className='btn-urgente'>
          🚨 Oportunidade Urgente
        </button>
        
        {/* Navegação */}
        <ul className='lista-links'>
          <li>
            <Link to='/vagas'>Ver Todas as Vagas</Link>
          </li>
          <li>
            <Link to='/bicos'>Bicos e Freelas</Link>
          </li>
          <li>
            <Link to='/empregador'>Sou Empregador</Link>
          </li>
          <li>
            <Link to='/perfil'>Meu Perfil</Link>
          </li>
        </ul>

      </section>

      {/* Seção de Vagas em Destaque */}
      <section className='secao'>
        <h2>Vagas na Sua Área</h2>
        <div className='lista-vagas'>
          {/* Vagas serão carregadas aqui */}
          <div className='vaga-card'>
            <h3>Garçom</h3>
            <p>Restaurante do Zé - 1.2km</p>
            <span className='badge-urgente'>⚡ Início Imediato</span>
          </div>
        </div>
      </section>
      
    </div>
  );
}