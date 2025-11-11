
import './index.scss';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pagina-home pagina">
       <header className='cabecalho'>
          <div className='card-logo'>
          <img src="./zonework1.png" alt='logo do zonework'/>
           </div>
           <Link to='/' className='logo-link'>
          <h1 className='titulo1'> 
            ZoneWork
           </h1>
           </Link>


           <ul className='botoes-link'>
          <li>
            <Link to='/vagas'>Ver Vagas</Link>
          </li>
          <li>
            <Link to='/bicos'>Bicos e Freelas</Link>
          </li>
          <li>
            <Link to='/perfil'>Sou Candidato</Link>
          </li>
          <li>
            <Link to='/empregador'>Sou Empresa</Link>
          </li>
          </ul>
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
        

        <select className='filtro-distancia'>
          <option>Até 1km</option>
          <option>Até 5km</option>
          <option>Até 10km</option>
          <option>Até 20km</option>
          <option>Até (CasaDoKrlh)km²</option>
        </select>
        <br /><br />



        <button className='botao-buscar'>Buscar Vagas</button>
        <button className='botao-urgente'>🚨 Oportunidade Urgente</button>

      </section>

      {/* Seção de Vagas em Destaque */}
      <section className='secao'>
        <h2>Vagas na Sua Área</h2>
        <div className='lista-vagas'>
          {/* Terão vagas aqui */}
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