import { useMemo, useState } from 'react'
import { EquipmentForm } from './components/EquipmentForm'
import { EquipmentList } from './components/EquipmentList'
import './App.css'

function App() {
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [categoryFilter, setCategoryFilter] = useState('todas')

  const refresh = () => setReload(prev => !prev)

  const filters = useMemo(() => {
    return {
      search,
      status: statusFilter,
      category: categoryFilter
    }
  }, [search, statusFilter, categoryFilter])

  return (
    <div className="page">
      <div className="bg-effect bg-1"></div>
      <div className="bg-effect bg-2"></div>

      <div className="container">
        <header className="hero">
          <div>
            <span className="badge">Asset Control</span>
            <h1>Painel de Controle de Ativos</h1>
            <p>
              Gerencie equipamentos de TI com visual profissional, filtros,
              indicadores e uma experiência mais moderna.
            </p>
          </div>
        </header>

        <section className="panel fade-up">
          <div className="section-title">
            <h2>Novo equipamento</h2>
            <p>Cadastre ativos para acompanhar o inventário.</p>
          </div>

          <EquipmentForm refresh={refresh} />
        </section>

        <section className="panel fade-up delay-1">
          <div className="top-bar">
            <div className="section-title">
              <h2>Inventário</h2>
              <p>Busque, filtre e acompanhe os ativos cadastrados.</p>
            </div>

            <div className="filters">
              <div className="filter-group">
                <label>Buscar</label>
                <input
                  type="text"
                  placeholder="Nome, patrimônio ou serial..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Status</label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="disponivel">Disponível</option>
                  <option value="em uso">Em uso</option>
                  <option value="manutencao">Manutenção</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Categoria</label>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                >
                  <option value="todas">Todas</option>
                  <option value="notebook">Notebook</option>
                  <option value="desktop">Desktop</option>
                  <option value="monitor">Monitor</option>
                  <option value="impressora">Impressora</option>
                  <option value="coletor">Coletor</option>
                  <option value="tablet">Tablet</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>
          </div>

          <EquipmentList refresh={reload} filters={filters} />
        </section>
      </div>
    </div>
  )
}

export default App