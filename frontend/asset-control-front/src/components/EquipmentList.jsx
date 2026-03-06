import { useEffect, useMemo, useState } from 'react'
import { deleteEquipment, getEquipments } from '../services/api'

export function EquipmentList({ refresh, filters }) {
  const [equipments, setEquipments] = useState([])
  const [loading, setLoading] = useState(true)

  const loadEquipments = async () => {
    try {
      setLoading(true)
      const data = await getEquipments()
      setEquipments(data)
    } catch (error) {
      setEquipments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEquipments()
  }, [refresh])

  const handleDelete = async id => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este equipamento?')

    if (!confirmDelete) {
      return
    }

    try {
      await deleteEquipment(id)
      loadEquipments()
    } catch (error) {
      alert('Erro ao excluir equipamento.')
    }
  }

  const filteredEquipments = useMemo(() => {
    return equipments.filter(item => {
      const searchText = filters.search.toLowerCase()

      const matchesSearch =
        item.name?.toLowerCase().includes(searchText) ||
        item.patrimony?.toLowerCase().includes(searchText) ||
        item.serial?.toLowerCase().includes(searchText)

      const matchesStatus =
        filters.status === 'todos' ||
        item.status?.toLowerCase() === filters.status

      const matchesCategory =
        filters.category === 'todas' ||
        item.category?.toLowerCase() === filters.category

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [equipments, filters])

  const stats = useMemo(() => {
    return {
      total: equipments.length,
      disponivel: equipments.filter(item => item.status === 'disponivel').length,
      emUso: equipments.filter(item => item.status === 'em uso').length,
      manutencao: equipments.filter(item => item.status === 'manutencao').length
    }
  }, [equipments])

  const getStatusClass = status => {
    if (status === 'disponivel') {
      return 'status status-disponivel'
    }

    if (status === 'em uso') {
      return 'status status-em-uso'
    }

    return 'status status-manutencao'
  }

  if (loading) {
    return <div className="empty">Carregando equipamentos...</div>
  }

  return (
    <>
      <div className="dashboard">
        <div className="stat-card">
          <div className="stat-label">Total de ativos</div>
          <div className="stat-value">{stats.total}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Disponíveis</div>
          <div className="stat-value">{stats.disponivel}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Em uso</div>
          <div className="stat-value">{stats.emUso}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Manutenção</div>
          <div className="stat-value">{stats.manutencao}</div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Patrimônio</th>
              <th>Serial</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Setor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredEquipments.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty">
                  Nenhum equipamento encontrado.
                </td>
              </tr>
            ) : (
              filteredEquipments.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.patrimony}</td>
                  <td>{item.serial}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={getStatusClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.sector || '-'}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}