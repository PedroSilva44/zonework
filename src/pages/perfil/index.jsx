
import './index.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Perfil() {
  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
    telefone: '',
    localizacao: '',
    habilidades: [],
    experiencia: '',
    tipoVaga: '',
    disponibilidade: '',
    sobre: 'Sou uma pessoa dedicada e com vontade de aprender novas habilidades...'
  });

  const [novaHabilidade, setNovaHabilidade] = useState('');
  const [isCadastrado, setIsCadastrado] = useState(false);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      const dados = JSON.parse(usuarioSalvo);

      setPerfil((prev) => ({
        ...prev,
        usuario: dados.usuario || '',
        email: dados.email || ''
      }));

      // Marca como "cadastrado" se tiver ID (ou outra verificação que quiser)
      setIsCadastrado(!!dados.id);
    }
  }, [])

  const adicionarHabilidade = () => {
    if (novaHabilidade && !perfil.habilidades.includes(novaHabilidade)) {
      setPerfil({
        ...perfil,
        habilidades: [...perfil.habilidades, novaHabilidade]
      });
      setNovaHabilidade('');
    }
  };

  const removerHabilidade = (habilidade) => {
    setPerfil({
      ...perfil,
      habilidades: perfil.habilidades.filter(h => h !== habilidade)
    });
  };

  const salvarPerfil = () => {
    // integrar com a API depois
    alert('Perfil salvo com sucesso!');
    console.log('Perfil salvo:', perfil);
  };

  return (
    <div className="pagina-perfil pagina">
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
        <div className="perfil-info-usuario">
          <p>
            Logado como: <strong>{perfil.usuario || 'Usuário'}</strong>
          </p>
        </div>

        <div className="perfil-header">
          <h1>Meu Perfil</h1>
          <p>Complete seu perfil para encontrar vagas que combinam com você</p>
        </div>


        <div className="perfil-secao">
          <h2>Informações Pessoais</h2>
          
          <div className="form-grid">
            {isCadastrado && (
            <div className="form-group">
              <label>Nome Completo</label>
              <input 
                type="text" 
                value={perfil.nome}
                onChange={(e) => setPerfil({...perfil, nome: e.target.value})}
                placeholder="Seu nome completo"
              />
            </div>
            )}

            <div className="form-group">
              <label>E-mail</label>
              <input 
                type="email" 
                value={perfil.email}
                onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                placeholder="seu.email@exemplo.com"
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input 
                type="tel" 
                value={perfil.telefone}
                onChange={(e) => setPerfil({...perfil, telefone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="form-group">
              <label>Localização</label>
              <input 
                type="text" 
                value={perfil.localizacao}
                onChange={(e) => setPerfil({...perfil, localizacao: e.target.value})}
                placeholder="Sua cidade e estado"
              />
            </div>
          </div>
        </div>



        <div className="perfil-secao">
          <h2>Habilidades</h2>
          <p>Adicione suas principais habilidades (ex: atendimento, vendas, organização)</p>
          
          <div className="habilidades-input">
            <input 
              type="text" 
              value={novaHabilidade}
              onChange={(e) => setNovaHabilidade(e.target.value)}
              placeholder="Digite uma habilidade..."
              onKeyPress={(e) => e.key === 'Enter' && adicionarHabilidade()}
            />
            <button 
              className="btn-adicionar"
              onClick={adicionarHabilidade}
            >
              <i className="fa fa-plus"></i> Adicionar
            </button>
          </div>

          <div className="habilidades-lista">
            {perfil.habilidades.map((habilidade, index) => (
              <span key={index} className="habilidade-tag">
                {habilidade}
                <button 
                  onClick={() => removerHabilidade(habilidade)}
                  className="btn-remover"
                >
                  <i className="fa fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        </div>


        <div className="perfil-secao">
          <h2>Preferências de Trabalho</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Nível de Experiência</label>
              <select 
                value={perfil.experiencia}
                onChange={(e) => setPerfil({...perfil, experiencia: e.target.value})}
              >
                <option value="iniciante">Iniciante / Sem experiência</option>
                <option value="junior">Júnior (até 2 anos)</option>
                <option value="pleno">Pleno (2-5 anos)</option>
                <option value="senior">Sênior (5+ anos)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo de Vaga Preferido</label>
              <select 
                value={perfil.tipoVaga}
                onChange={(e) => setPerfil({...perfil, tipoVaga: e.target.value})}
              >
                <option value="presencial">Presencial</option>
                <option value="hibrido">Híbrido</option>
                <option value="remoto">Remoto</option>
                <option value="qualquer">Qualquer um</option>
              </select>
            </div>

            <div className="form-group">
              <label>Disponibilidade</label>
              <select 
                value={perfil.disponibilidade}
                onChange={(e) => setPerfil({...perfil, disponibilidade: e.target.value})}
              >
                <option value="imediata">Imediata</option>
                <option value="1semana">1 semana</option>
                <option value="2semanas">2 semanas</option>
                <option value="1mes">1 mês</option>
                <option value="+1mes">+ 1 mês</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sobre Pessoal */}
        <div className="perfil-secao">
          <h2>Um pouco de Você</h2>
          <p>Fale um pouco sobre você (30 segundos de leitura)</p>
          
          <textarea 
            value={perfil.sobre}
            onChange={(e) => setPerfil({...perfil, sobre: e.target.value})}
            placeholder="Conte brevemente sobre suas experiências, objetivos e por que você seria uma boa contratação..."
            rows="5"
            className="sobre-textarea"
          />
          <div className="contador-caracteres">
            {perfil.sobre.length}/500 caracteres
          </div>
        </div>

        {/* Ações */}
        <div className="perfil-actions">
          <button className="btn-primario" onClick={salvarPerfil}>
            <i className="fa fa-save"></i> Salvar Perfil
          </button>

          <button className="btn-link">
            <i className="fa fa-eye"></i> Visualizar Como Empregador
          </button>
        </div>

        {/* Estatísticas */}
        <div className="perfil-stats">
          <div className="stat-card">
            <h3>0</h3>
            <p>Candidaturas</p>
          </div>
        </div>
      </section>
    </div>
  );
}