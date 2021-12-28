exports.up = function (knex) {
  return knex
    .raw(
      `CREATE TABLE IF NOT EXISTS public.users
  (
      user_id integer NOT NULL AUTOINCREMENT,
      user text NOT NULL,
      password text NOT NULL,
      PRIMARY KEY (user_id)
  );`,
    )
    .then((result) => console.log(result));
};

exports.down = function (knex) {
  knex.raw('DROP TABLE public.users');
};
