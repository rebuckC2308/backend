exports.up = function (knex) {
  return knex
    .raw(
      'ALTER TABLE users ADD CONSTRAINT test UNIQUE (user);',
    )
    .then((result) => console.log(result));
};

exports.down = function () {
  console.log('FAILURE TO ADD UNIQUE CONSTRAINT');
};
