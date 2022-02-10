// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS public.Contests 
  (id serial PRIMARY KEY NOT NULL, 
   creator text NOT NULL, 
   contestID integer NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_DATE)`);
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  knex.raw('DROP TABLE public.Contests');
};
