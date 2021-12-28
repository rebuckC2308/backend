// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'restaurant',
      user: 'postgres',
      password: process.env.POSTGRES_PW,
      host: '127.0.0.1',
      port: '5432',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
