import { useState } from 'react'
import { createEquipment } from '../services/api'

export function EquipmentForm({ refresh }) {
  const [form, setForm] = useState({
    name: '',
    patrimony: '',
    serial: '',
    category: 'notebook',
    status: 'disponivel',
    sector: ''
  })

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearForm = () => {
    setForm({
      name: '',
      patrimony: '',
      serial: '',
      category: 'notebook',
      status: 'disponivel',
      sector: ''
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setMessageType('')

    try {
      await createEquipment(form)

      setMessage('Equipamento cadastrado com sucesso.')
      setMessageType('success')

      clearForm()
      refresh()
    } catch (error) {
      setMessage('Erro ao cadastrar equipamento.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group col-2">
        <label>Nome do equipamento</label>
        <input
          type="text"
          name="name"
          placeholder="Ex: Notebook Dell Latitude"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Patrimônio</label>
        <input
          type="text"
          name="patrimony"
          placeholder="Ex: TI-001"
          value={form.patrimony}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Serial</label>
        <input
          type="text"
          name="serial"
          placeholder="Ex: SN123456"
          value={form.serial}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Categoria</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="notebook">Notebook</option>
          <option value="desktop">Desktop</option>
          <option value="monitor">Monitor</option>
          <option value="impressora">Impressora</option>
          <option value="coletor">Coletor</option>
          <option value="tablet">Tablet</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="disponivel">Disponível</option>
          <option value="em uso">Em uso</option>
          <option value="manutencao">Manutenção</option>
        </select>
      </div>

      <div className="form-group col-2">
        <label>Setor / Observação</label>
        <input
          type="text"
          name="sector"
          placeholder="Ex: TI, Expedição, Financeiro..."
          value={form.sector}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar equipamento'}
        </button>
      </div>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
    </form>
  )
}