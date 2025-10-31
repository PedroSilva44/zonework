
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './pages/app';
import Vagas from './pages/vagas';
import Bicos from './pages/bicos';
import Empregador from './pages/empregador';
import Perfil from './pages/perfil';
import NaoEncontrado from './pages/naoEncontrado';
import Inicio from './pages/inicio/index.jsx';

export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/inicio' element={ <Inicio/> } />
                <Route path='/' element={<App />} />
                <Route path='/vagas' element={<Vagas />} />
                <Route path='/bicos' element={<Bicos />} />
                <Route path='/empregador' element={<Empregador />} />
                <Route path='/perfil' element={<Perfil />} />
                <Route path='*' element={<NaoEncontrado />} />
            </Routes>
        </BrowserRouter>
    )
}