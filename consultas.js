const pool = require('./connection')

const getCostumers = async () => {
  const result = await pool.query('SELECT * FROM cliente')
  return result.rows
}

const getCostumerById = async (idCliente) => {
  const query = 'SELECT * FROM cliente WHERE id = $1'
  const values = [idCliente]
  const result = await pool.query(query, values)

  return result.rows[0]
}

const addCostumer = async (name, email) => {
  const { rowCount: costumerExist } = await pool.query(
    'SELECT * FROM cliente WHERE email = $1',
    [email]
  )

  if (costumerExist > 0) {
    return 0
  }

  const result = await pool.query({
    text: `INSERT INTO cliente VALUES (DEFAULT, $1, $2)`,
    values: [name, email]
  })

  return result.rowCount
}

const updateCostumer = async (idCliente, nombre) => {
  // verificamos que los que está llegando es un id (numero) o un string (nombre)
  const isNumber = !isNaN(Number(idCliente))

  const query = `UPDATE cliente SET nombre=$2 WHERE ${
    isNumber ? 'id' : 'nombre'
  } = $1`
  const values = [idCliente, nombre]

  const result = await pool.query(query, values)

  const rowCount = result.rowCount

  return rowCount
}

const deleteCostumer = async (idCliente) => {
  const query = 'DELETE FROM cliente WHERE id=$1'
  const values = [idCliente]

  const result = await pool.query(query, values)

  return result.rowCount
}

module.exports = {
  getCostumers,
  getCostumerById,
  addCostumer,
  updateCostumer,
  deleteCostumer
}
