require('isomorphic-fetch');

function getKeywords(req, res, next) {
  fetch('https://apiv2.indico.io/keywords?version=2', {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: process.env.API_KEY,
      data:    req.body.question,
    }),
  })
    .then(fetchRes => fetchRes.json())
    .then((jsonRes) => {
      console.log(jsonRes);
      res.locals.initialData = jsonRes.results;
      next();
    })
    .catch(err => next(err));
}

async function getKeywordsForSeed({question, id}) {
  const initialRes = await fetch('https://apiv2.indico.io/keywords?version=2', {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: process.env.API_KEY,
      data:    question,
    }),
  });
  const jsonRes = await initialRes.json();
  const keywords = [];
  for (const key in jsonRes.results) {
    keywords.push({word: key, fc_id: id});
  }
  console.log(keywords);
  return keywords;
}

function formatApiData(req, res, next) {
  const keywords = [];
  for (const key in res.locals.initialData) {
    keywords.push(key);
  }
  res.locals.keywords = keywords;
  next();
}

module.exports = {
  getKeywords,
  getKeywordsForSeed,
  formatApiData,
};
