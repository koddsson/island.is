/* eslint-env node */
module.exports = {
  development: {
    username: 'postgres',
    password: 'dev_db',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: 'test_db',
    password: 'test_db',
    database: 'test_db',
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
}
