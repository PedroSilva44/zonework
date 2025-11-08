
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Vagas from './pages/vagas';
import Bicos from './pages/bicos';
import Empregador from './pages/empregador';
import Perfil from './pages/perfil';
import Inicio from './pages/inicio';
import Cadastro from './pages/cadastro';
import Entrar from './pages/entrar';

import NaoEncontrado from './pages/naoEncontrado';

export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Inicio/> } />
                <Route path='/home' element={<Home />} />
                <Route path='/vagas' element={<Vagas />} />
                <Route path='/bicos' element={<Bicos />} />
                <Route path='/empregador' element={<Empregador />} />
                <Route path='/perfil' element={<Perfil />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/entrar' element={<Entrar />} />

                <Route path='*' element={<NaoEncontrado />} />
            </Routes>
        </BrowserRouter>
    )
}