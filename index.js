const express = require('express')
const { getCostumers, addCostumer } = require('./consultas')

const app = express()

app.use(express.json())

app.get('/clientes', async (req, res) => {
  const clientes = await getCostumers()
  res.json({ clientes, message: 'Estos son los clientes' })
})

app.post('/clientes', async (req, res) => {
  const { name, email } = req.body
  const result = await addCostumer(name, email)

  if (result === 0) {
    return res
      .status(400)
      .json({ message: 'No se ha podido añadir el cliente' })
  }
  res.status(201).json({ message: 'Cliente añadido' })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
