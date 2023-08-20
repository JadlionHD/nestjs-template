/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (tb) => {
    tb.increments('id').primary().notNullable();
    tb.string('username', 255).notNullable();
    tb.string('password', 255).notNullable();
    tb.string('email', 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
