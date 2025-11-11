
import './index.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
 
export default function Empregador() {
  const [empresa, setEmpresa] = useState({
    nome: '',
    cnpj: '12.345.678/0001-90',
    telefone: '',
    email: '',
    endereco: '',
    sobre: 'Uma empresa focada em...',
    setor: ''
  });

  const [vagas, setVagas] = useState([
    {
      id: 1,
      titulo: 'Vendedor',
      tipo: 'meio-periodo',
      modalidade: 'presencial',
      experiencia: 'iniciante',
      salario: '1500-2000',
      descricao: 'Procuramos vendedor para loja no centro...',
      status: 'ativa',
      candidatos: 0,
      data: '2024-01-15'
    }
  ]);

  const [novaVaga, setNovaVaga] = useState({
    titulo: '',
    tipo: 'integral',
    modalidade: 'presencial',
    experiencia: 'iniciante',
    salario: '',
    descricao: '',
    urgente: false,
    inicioImediato: false,
    semCurriculo: false
  });

  const [abaAtiva, setAbaAtiva] = useState('painel');

  const criarVaga = (e) => {
    e.preventDefault();
    const vaga = {
      id: vagas.length + 1,
      ...novaVaga,
      status: 'ativa',
      candidatos: 0,
      data: new Date().toISOString().split('T')[0]
    };
    
    setVagas([...vagas, vaga]);
    setNovaVaga({
      titulo: '',
      tipo: 'integral',
      modalidade: 'presencial',
      experiencia: 'iniciante',
      salario: '',
      descricao: '',
      urgente: false,
      inicioImediato: false,
      semCurriculo: false
    });
    
    alert('Vaga publicada com sucesso!');
  };

  const pausarVaga = (id) => {
    setVagas(vagas.map(vaga => 
      vaga.id === id ? { ...vaga, status: 'pausada' } : vaga
    ));
  };

  const reativarVaga = (id) => {
    setVagas(vagas.map(vaga => 
      vaga.id === id ? { ...vaga, status: 'ativa' } : vaga
    ));
  };

  return (
    <div className="pagina-empregador pagina">
      <header className='cabecalho'>
        <div className='card-logo'>
        <img src="./zonework1.png" alt='logo do zonework'/>
        </div>
        <Link to='/home' className='logo-link'>
        <h1 className='titulo1'> 
          ZoneWork
        </h1>
        </Link>
      </header>

      <section className='secao'>
        <div className="empregador-header">
          <h1>Portal do Empregador</h1>
          <p>Encontre os talentos certos para sua empresa</p>
        </div>



        {/* Navegação por Abas */}
        <div className="abas-navegacao">
          <button 
            className={`aba ${abaAtiva === 'painel' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('painel')}
          >
            <i className="fa fa-chart-bar"></i> Painel
          </button>
          <button 
            className={`aba ${abaAtiva === 'vagas' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('vagas')}
          >
            <i className="fa fa-list"></i> Minhas Vagas
          </button>
          <button 
            className={`aba ${abaAtiva === 'nova-vaga' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('nova-vaga')}
          >
            <i className="fa fa-plus"></i> Nova Vaga
          </button>
          <button 
            className={`aba ${abaAtiva === 'empresa' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('empresa')}
          >
            <i className="fa fa-building"></i> Dados da Empresa
          </button>
        </div>


        {/* Divisão das Abas */}
        <div className="divisao-aba">
          
          {/* Painel */}
          {abaAtiva === 'painel' && (
            <div className="painel">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fa fa-briefcase"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{vagas.length}</h3>
                    <p>Vagas Ativas</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon candidatos">
                    <i className="fa fa-users"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{vagas.reduce((total, vaga) => total + vaga.candidatos, 0)}</h3>
                    <p>Total de Candidatos</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon visualizacoes">
                    <i className="fa fa-eye"></i>
                  </div>
                  <div className="stat-info">
                    <h3>0</h3>
                    <p>Visualizações</p>
                  </div>
                </div>
              </div>

              <div className="vagas-recentes">
                <h2>Vagas Recentes</h2>
                {vagas.slice(0, 3).map(vaga => (
                  <div key={vaga.id} className="vaga-resumo">
                    <h4>{vaga.titulo}</h4>
                    <span className={`status ${vaga.status}`}>
                      {vaga.status === 'ativa' ? '🟢 Ativa' : '🟡 Pausada'}
                    </span>
                    <p>{vaga.candidatos} candidatos</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lista de Vagas */}
          {abaAtiva === 'vagas' && (
            <div className="lista-vagas">
              <h2>Minhas Vagas</h2>
              
              {vagas.length === 0 ? (
                <div className="sem-vagas">
                  <i className="fa fa-inbox"></i>
                  <p>Nenhuma vaga publicada ainda</p>
                  <button 
                    className="btn-primario"
                    onClick={() => setAbaAtiva('nova-vaga')}
                  >
                    Criar Primeira Vaga
                  </button>
                </div>
              ) : (
                <div className="vagas-grid">
                  {vagas.map(vaga => (
                    <div key={vaga.id} className="vaga-card">
                      <div className="vaga-header">
                        <h3>{vaga.titulo}</h3>
                        <span className={`status ${vaga.status}`}>
                          {vaga.status === 'ativa' ? '🟢 Ativa' : '🟡 Pausada'}
                        </span>
                      </div>
                      
                      <div className="vaga-detalhes">
                        <span className="detalhe">
                          <i className="fa fa-clock"></i> {vaga.tipo}
                        </span>
                        <span className="detalhe">
                          <i className="fa fa-building"></i> {vaga.modalidade}
                        </span>
                        <span className="detalhe">
                          <i className="fa fa-user-graduate"></i> {vaga.experiencia}
                        </span>
                      </div>
                      
                      <p className="vaga-descricao">
                        {vaga.descricao.substring(0, 100)}...
                      </p>
                      
                      <div className="vaga-stats">
                        <span className="candidatos">
                          <i className="fa fa-users"></i> {vaga.candidatos} candidatos
                        </span>
                        <span className="data">
                          <i className="fa fa-calendar"></i> {vaga.data}
                        </span>
                      </div>
                      
                      <div className="vaga-actions">
                        {vaga.status === 'ativa' ? (
                          <button 
                            className="btn-pausar"
                            onClick={() => pausarVaga(vaga.id)}
                          >
                            <i className="fa fa-pause"></i> Pausar
                          </button>
                        ) : (
                          <button 
                            className="btn-reativar"
                            onClick={() => reativarVaga(vaga.id)}
                          >
                            <i className="fa fa-play"></i> Reativar
                          </button>
                        )}
                        <button className="btn-editar">
                          <i className="fa fa-edit"></i> Editar
                        </button>
                        <button className="btn-candidatos">
                          <i className="fa fa-eye"></i> Ver Candidatos
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Nova Vaga */}
          {abaAtiva === 'nova-vaga' && (
            <div className="nova-vaga">
              <h2>Publicar Nova Vaga</h2>
              
              <form onSubmit={criarVaga} className="form-vaga">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Título da Vaga *</label>
                    <input 
                      type="text" 
                      value={novaVaga.titulo}
                      onChange={(e) => setNovaVaga({...novaVaga, titulo: e.target.value})}
                      placeholder="Ex: Vendedor, Auxiliar Administrativo..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo de Emprego *</label>
                    <select 
                      value={novaVaga.tipo}
                      onChange={(e) => setNovaVaga({...novaVaga, tipo: e.target.value})}
                    >
                      <option value="integral">Período Integral</option>
                      <option value="meio-periodo">Meio Período</option>
                      <option value="temporario">Temporário</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Modalidade *</label>
                    <select 
                      value={novaVaga.modalidade}
                      onChange={(e) => setNovaVaga({...novaVaga, modalidade: e.target.value})}
                    >
                      <option value="presencial">Presencial</option>
                      <option value="hibrido">Híbrido</option>
                      <option value="remoto">Remoto</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Nível de Experiência *</label>
                    <select 
                      value={novaVaga.experiencia}
                      onChange={(e) => setNovaVaga({...novaVaga, experiencia: e.target.value})}
                    >
                      <option value="iniciante">Iniciante / Sem experiência</option>
                      <option value="junior">Júnior</option>
                      <option value="pleno">Pleno</option>
                      <option value="senior">Sênior</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Faixa Salarial</label>
                    <input 
                      type="text" 
                      value={novaVaga.salario}
                      onChange={(e) => setNovaVaga({...novaVaga, salario: e.target.value})}
                      placeholder="Ex: R$ 1500-2000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Descrição da Vaga *</label>
                  <textarea 
                    value={novaVaga.descricao}
                    onChange={(e) => setNovaVaga({...novaVaga, descricao: e.target.value})}
                    placeholder="Descreva as responsabilidades, requisitos e benefícios..."
                    rows="6"
                    required
                  />
                </div>

                <div className="opcoes-vaga">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={novaVaga.urgente}
                      onChange={(e) => setNovaVaga({...novaVaga, urgente: e.target.checked})}
                    />
                    <span className="checkmark"></span>
                    🚨 Vaga Urgente (aparece no modo oportunidade urgente)
                  </label>

                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={novaVaga.inicioImediato}
                      onChange={(e) => setNovaVaga({...novaVaga, inicioImediato: e.target.checked})}
                    />
                    <span className="checkmark"></span>
                    ⚡ Início Imediato
                  </label>

                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={novaVaga.semCurriculo}
                      onChange={(e) => setNovaVaga({...novaVaga, semCurriculo: e.target.checked})}
                    />
                    <span className="checkmark"></span>
                    📝 Aceita candidatura sem currículo
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primario btn-grande">
                    <i className="fa fa-paper-plane"></i> Publicar Vaga
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Dados da Empresa */}
          {abaAtiva === 'empresa' && (
            <div className="dados-empresa">
              <h2>Dados da Empresa</h2>
              
              <form className="form-empresa">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nome da Empresa *</label>
                    <input 
                      type="text" 
                      value={empresa.nome}
                      onChange={(e) => setEmpresa({...empresa, nome: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>CNPJ</label>
                    <input 
                      type="text" 
                      value={empresa.cnpj}
                      onChange={(e) => setEmpresa({...empresa, cnpj: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Telefone *</label>
                    <input 
                      type="tel" 
                      value={empresa.telefone}
                      onChange={(e) => setEmpresa({...empresa, telefone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>E-mail *</label>
                    <input 
                      type="email" 
                      value={empresa.email}
                      onChange={(e) => setEmpresa({...empresa, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Endereço</label>
                    <input 
                      type="text" 
                      value={empresa.endereco}
                      onChange={(e) => setEmpresa({...empresa, endereco: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Setor de Atuação</label>
                    <select 
                      value={empresa.setor}
                      onChange={(e) => setEmpresa({...empresa, setor: e.target.value})}
                    >
                      <option value="comercio">Comércio</option>
                      <option value="servicos">Serviços</option>
                      <option value="industria">Indústria</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="saude">Saúde</option>
                      <option value="educacao">Educação</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Sobre a Empresa</label>
                  <textarea 
                    value={empresa.sobre}
                    onChange={(e) => setEmpresa({...empresa, sobre: e.target.value})}
                    placeholder="Conte um pouco sobre sua empresa..."
                    rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-primario">
                    <i className="fa fa-save"></i> Salvar Dados
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}