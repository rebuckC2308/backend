exports.up = function (knex) {
  return knex
    .raw(
      `create sequence user_id_seq;
      alter table users alter user_id set default nextval('user_id_seq');`,
    )
    .then((result) => console.log(result));
};

exports.down = function () {
  console.log('FAILURE TO UPDATE USER ID SEQUENCE');
};
