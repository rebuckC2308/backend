// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex
    .raw('CREATE TABLE IF NOT EXISTS public.users (user_id SERIAL PRIMARY KEY, username text NOT NULL UNIQUE, password text NOT NULL)')
    // eslint-disable-next-line no-console
    .then((result) => console.log(result));
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  knex.raw('DROP TABLE public.users');
};
