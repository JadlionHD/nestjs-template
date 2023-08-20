/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      username: 'HendraGunawan',
      password: '123',
      email: 'hendra@gmail.com',
    },
    {
      id: 2,
      username: 'HansAnjem',
      password: '123',
      email: 'hans@gmail.com',
    },
    {
      id: 3,
      username: 'Mamang',
      password: '123',
      email: 'mamang@gmail.com',
    },
  ]);
};
