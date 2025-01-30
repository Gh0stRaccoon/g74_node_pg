const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'admin123',
  database: 'gestion_clientes',
  allowExitOnIdle: true
})

module.exports = pool
