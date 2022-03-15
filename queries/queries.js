const windowsQueries = {
  getUser: 'SELECT * FROM public.USERS WHERE username = $1',
  insertUser: 'INSERT INTO public.USERS ("username", "password") VALUES ($1, $2)',
  insertContest: 'INSERT INTO public.Contests (creator, contestid) VALUES ($1, $2) RETURNING *',
  insertEntry: 'INSERT INTO public.entries (contestid, name, imageurl, description) VALUES ($1, $2, $3, $4)',
  getIDofContest: 'SELECT * FROM public.contests WHERE contestid = $1',
  getAllEntries: 'SELECT * FROM public.entries WHERE contestid = $1',
};

const macQueries = {
  getUser: 'SELECT * FROM USERS WHERE username = $1',
  insertUser: 'INSERT INTO users ("username", "password") VALUES ($1, $2)',
  insertEntry: 'INSERT INTO entries ("contestid", "name", "imageurl", "description") VALUES ($1, $2, $3, $4)',
  getAllEntries: 'SELECT * FROM entries WHERE contestid = $1',
  insertContest: 'INSERT INTO contests ("creator", "contestid") VALUES ($1, $2) RETURNING id',
  getIDofContest: 'SELECT * FROM contests WHERE contestid = $1',
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
