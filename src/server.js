const express = require('express')
require('dotenv').config()

const pool = require('./database/connection')

const app = express()

const equipmentsRoutes = require('./routes/equipmentsRoutes')

app.use(express.json())

app.use('/equipments', equipmentsRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API rodando' })
})

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro na conexão' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})