const pool = require('../database/connection')

async function getEquipments(req, res) {
    try {
        const result = await pool.query(
            'SELECT * FROM equipments ORDER BY id ASC'
        )

        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao buscar equipamentos' })
    }
}

async function createEquipment(req, res) {
    const { name, patrimonio, serial_number } = req.body

    try {
        const result = await pool.query(
            'INSERT INTO equipments (name, patrimonio, serial_number) VALUES ($1, $2, $3) RETURNING *',
            [name, patrimonio, serial_number]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao criar equipamento' })
    }
}  // ← ESSA CHAVE ESTAVA FALTANDO

async function updateEquipment(req, res) {
    const { id } = req.params
    const { name, patrimonio, serial_number, status } = req.body

    try {
        const result = await pool.query(
            `UPDATE equipments 
             SET name = $1,
                 patrimonio = $2,
                 serial_number = $3,
                 status = $4
             WHERE id = $5
             RETURNING *`,
            [name, patrimonio, serial_number, status, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Equipamento não encontrado' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao atualizar equipamento' })
    }
}

async function deleteEquipment(req, res) {
    const { id } = req.params

    try {
        const result = await pool.query(
            'DELETE FROM equipments WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Equipamento não encontrado' })
        }

        res.json({ message: 'Equipamento removido com sucesso' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao remover equipamento' })
    }
}

module.exports = {
    getEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment
}