// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './data/dev.db',
    },
  },

  staging: {
    client: 'better-sqlite3',
    connection: {
      filename: './data/staging.db',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'better-sqlite3',
    connection: {
      filename: './data/production.db',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
