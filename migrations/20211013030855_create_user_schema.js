exports.up = function (knex) {
  return knex
    .raw(
      `CREATE TABLE IF NOT EXISTS public.users
  (
      user_id integer NOT NULL,
      email text NOT NULL,
      password text NOT NULL,
      PRIMARY KEY (user_id)
  );
  
  ALTER TABLE public.users
      OWNER to postgres;`
    )
    .then((result) => console.log(result));
};

exports.down = function (knex) {
  knex.raw(`DROP TABLE public.users`);
};
