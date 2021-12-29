const windowsQueries = {
  getUser: 'SELECT * FROM USERS WHERE USERS.user = $1',
  insertUser: 'INSERT INTO USERS.users ("user", "password") VALUES ($1, $2)',
};

const macQueries = {
  getUser: 'SELECT * FROM USERS WHERE user = $1',
  insertUser: 'INSERT INTO users ("user", "password") VALUES ($1, $2)',
};

const queries = {
  win32: windowsQueries,
  darwin: macQueries,
};

function query(queryName) {
  const OSQueries = queries[process.platform];
  const specificQuery = OSQueries && OSQueries[queryName];

  return specificQuery;
}

module.exports = { query };
