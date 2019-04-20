require('isomorphic-fetch');
require('dotenv');

const fetchKeywordsForQuestion = (req, res, next) => {
  console.log(req.body)
  fetch('http://api.cortical.io/rest/text/keywords?retina_name=en_associative', {
    method: 'POST',
    headers: {
      'api-key': process.env.API_KEY_NEW,
      'Content-Type': 'application/json',
    },
    body: req.body.question
  })
    .then(res => res.json())
    .then(jsonRes => {
      res.locals.keywords = jsonRes;
      return next();
    });
}

module.exports = {
  fetchKeywordsForQuestion,
};

