const windowsQueries = {
  getUser: 'SELECT * FROM public.USERS WHERE username = $1',
  insertUser: 'INSERT INTO public.USERS ("username", "password") VALUES ($1, $2)',
  insertContest: 'INSERT INTO public.Contests (creator, contestID) VALUES ($1, $2)',
  insertEntry: 'INSERT INTO public.entries (contestId, name, imageurl, description)VALUES ($1, $2, $3, $4)',
  getIDofContest: 'SELECT * FROM public.contests WHERE contestID = $1',
  getAllEntries: 'SELECT * FROM public.entries WHERE contestID = $1',
};

const macQueries = {
  getUser: 'SELECT * FROM USERS WHERE user = $1',
  insertUser: 'INSERT INTO users ("username", "password") VALUES ($1, $2)',
  insertContest: 'INSERT INTO contests ("creator", "contestID") VALUES ($1, $2)',
  insertEntry: 'INSERT INTO entries ("contestId", "name", "imageurl", "description")VALUES ($1, $2, $3, $4)',
  getAllEntries: 'SELECT * FROM entries WHERE contestID = $1',
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
