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

          <p>
            Sinissstro...
          </p>
        
        </section>


      </div>
    )
}