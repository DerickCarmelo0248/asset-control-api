const API_URL = 'http://localhost:3000/equipments'

export async function getEquipments() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Erro ao buscar equipamentos')
  }

  return response.json()
}

export async function createEquipment(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Erro ao cadastrar equipamento')
  }

  return response.json()
}

export async function deleteEquipment(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Erro ao excluir equipamento')
  }

  return response.json()
}