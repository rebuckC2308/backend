// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS public.entries
  (id SERIAL, entryId INT, name VARCHAR NOT NULL,imageURL VARCHAR, description VARCHAR, 
    PRIMARY KEY (id), CONSTRAINT contestID FOREIGN KEY (ID) REFERENCES public.contests(id)
);`);
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  knex.raw('DROP TABLE public.entries');
};
