const pool = require('../config/connection')

exports.getEquipments = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT * FROM equipments
      ORDER BY id DESC
    `)

    res.json(result.rows)

  } catch (error) {

    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar equipamentos' })

  }
}


exports.createEquipment = async (req, res) => {

  const { name, patrimony, serial, category, status, sector } = req.body

  try {

    const result = await pool.query(
      `
      INSERT INTO equipments
      (name, patrimony, serial, category, status, sector)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [name, patrimony, serial, category, status, sector]
    )

    res.status(201).json(result.rows[0])

  } catch (error) {

    console.error(error)
    res.status(500).json({ error: 'Erro ao cadastrar equipamento' })

  }

}


exports.deleteEquipment = async (req, res) => {

  const { id } = req.params

  try {

    await pool.query(
      `
      DELETE FROM equipments
      WHERE id = $1
      `,
      [id]
    )

    res.json({ message: 'Equipamento excluído com sucesso' })

  } catch (error) {

    console.error(error)
    res.status(500).json({ error: 'Erro ao excluir equipamento' })

  }

}