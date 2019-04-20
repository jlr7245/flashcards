require('isomorphic-fetch');

// fetch('http://api.cortical.io/rest/text/keywords?retina_name=en_associative', {
//   method: 'POST',
//   headers: {
//     'api-key': PROCESS.ENV.API_KEY_NEW,
//     'Content-Type': 'application/json',
//   },
//   body: 'the text of whatever question'
// })
//   .then(res => res.json())
//   .then(jsonRes => {
//     console.log(jsonRes)
//   });

fetch('https://api.stackexchange.com/2.2/similar?order=desc&sort=activity&title=transaction pg-promise&site=stackoverflow')
  .then(res => res.json())
  .then(jsonRes => {
    console.log(jsonRes.items)
  })
