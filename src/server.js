const express = require('express')
require('dotenv').config()

const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const equipmentsRoutes = require('./routes/equipmentsRoutes')
const pool = require('./config/connection')

app.use('/equipments', equipmentsRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Asset Control rodando' })
})

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro na conexão com o banco' })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})