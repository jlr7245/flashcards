function Flashcard(card) {
  this.question = this.validate(card.question, 'question');
  this.answer = this.validate(card.answer, 'answer');
}

Flashcard.__proto__ = require('./model-defaults')('flashcards');
Flashcard.prototype = Object.assign(Flashcard.prototype, require('./utils'));

module.exports = Flashcard;
