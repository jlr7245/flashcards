// utilitarian methods
const utils = {
  modify: function(changes) {
    return Object.assign(this, changes);
  },
  validate: (property, propType) => {
    if (property) return property;
    else throw new Error(`Missing property ${propType}`);
  },
}

// default model methods
const modelDefaults = (tablename) => ({
  findAll: () => console.log(`SELECT * FROM ${tablename}`),
  findById: (id) => console.log(`SELECT * FROM ${tablename} WHERE id = ${id}`),
  destroy: (id) => console.log(`DELETE FROM ${tablename} WHERE id = ${id}`),
});

// our Flashcard constructor
function Flashcard(card) {
  this.question = this.validate(card.question, 'question');
  this.answer = this.validate(card.answer, 'answer');
}

// attach the default model methods as static methods
// and the utility 
Object.setPrototypeOf(Flashcard, modelDefaults('flashcards'));
Flashcard.prototype = Object.assign(Flashcard.prototype, utils);


// and now we can do all these things
Flashcard.findAll(); // `SELECT * FROM flashcards`
const newFlashcard = new Flashcard({ question: 'aaa', answer: 'aaa' });
newFlashcard.modify({ question: 'lsdjfslkdfjlksfd' });
console.log(newFlashcard); // Flashcard { question: 'lsdjfslkdfjlksfd', answer: 'aaa' }
