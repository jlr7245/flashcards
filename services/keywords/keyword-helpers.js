require('isomorphic-fetch');
require('dotenv');

const fetchKeywordsForQuestion = (req, res, next) => {
  fetch(
    'http://api.cortical.io/rest/text/keywords?retina_name=en_associative',
    {
      method: 'POST',
      headers: {
        'api-key': process.env.API_KEY_NEW,
        'Content-Type': 'application/json',
      },
      body: req.body.question,
    }
  )
    .then(res => res.json())
    .then(jsonRes => {
      res.locals.keywords = jsonRes;
      return next();
    })
    .catch(next);
};

const fetchQuestionsFromKeywords = (req, res, next) => {
  const keywordsList = res.locals.keywords.join(' ');
  fetch(
    `https://api.stackexchange.com/2.2/similar?order=desc&sort=activity&title=${keywordsList}&site=stackoverflow`
  )
    .then(res => res.json())
    .then(jsonRes => {
      console.log(jsonRes.items);
      res.locals.soQuestions = jsonRes.items.map(
        ({
          link,
          title,
          score,
          answer_count,
          creation_date,
          is_answered,
          tags,
          owner,
        }) => ({
          link,
          title,
          answer_count,
          score,
          creation_date,
          is_answered,
          tags,
          owner: owner.display_name,
        })
      );
      return next();
    })
    .catch(next);
};

module.exports = {
  fetchKeywordsForQuestion,
  fetchQuestionsFromKeywords,
};
