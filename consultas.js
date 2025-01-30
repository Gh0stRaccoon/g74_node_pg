const pool = require('./connection')

const getCostumers = async () => {
  const result = await pool.query('SELECT * FROM cliente')
  return result.rows
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

module.exports = {
  getCostumers,
  addCostumer
}
