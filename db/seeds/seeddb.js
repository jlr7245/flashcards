const seedData = require('./seeds.js');
const keywordHelpers = require('../../services/keywords/keyword-helpers');
const Flashcard = require('../../models/Flashcard');
const Keyword = require('../../models/Keyword');

const db = require('../config.js');

require('dotenv').config();

const allFlashcards = seedData.map(flashcard => ({
  ...flashcard,
  user_id: Math.floor(Math.random() * 3) + 1,
}));


async function insertAndFindKeywords(arr) {
  try {
    const savedFlashcardObjs = await Promise.all(
      arr.map(flashcard => new Flashcard(flashcard).save())
    );
    const allKeywords = await Promise.all(
      savedFlashcardObjs.map(flashcard =>
        keywordHelpers.getKeywordsForSeed(flashcard)
      )
    );
    const keywordsArr = allKeywords.reduce((acc, val) => acc.concat(val), []);
    const justWords = keywordsArr.map(keyword => keyword.word);
    const upsertedKeywords = await Keyword.upsertSeveral(justWords);
    const merged = mergeObjs(keywordsArr, upsertedKeywords);
    const results = await associateKeywords(merged);
    console.log(results);
  } catch(err) {
    console.log(err);
  }

}

function mergeObjs(arr1, arr2) {
  return arr1.map((obj, i) => {
    return ({
      ...obj,
      ...arr2[i]
    });
  });
}

async function associateKeywords(keywords) {
  return await db.tx(t => {
    const queries = keywords.map(keyword => {
      return t.one(`
        INSERT INTO flashcards_keywords
        (kw_id, fc_id)
        VALUES ($1, $2)
        RETURNING *
      `, [keyword.id, keyword.fc_id])
    });
    return t.batch(queries);
  });
}


insertAndFindKeywords(allFlashcards);
