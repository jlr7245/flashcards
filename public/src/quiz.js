console.log('quiz.js is connected!');

const list = [];

const trueOrFalse = {
  true: true,
  false: false,
};

function reduceAndSetList() {
  const stringOfIds = list
    .filter(item => item.inList)
    .map(thing => thing.id)
    .join();
  document.querySelector('#flashcardids').value = stringOfIds;
}

function addToList(flashcard) {
  if (!trueOrFalse[flashcard.dataset.inlist]) {
    list.push({ id: flashcard.dataset.id, inList: true });
    flashcard.classList.add('quiz-add');
    flashcard.dataset.inlist = 'true';
  } else {
    const current = list.find(item => {
      return item.id == flashcard.dataset.id;
    });
    current.inList = false;
    flashcard.classList.remove('quiz-add');
    flashcard.dataset.inlist = 'false';
  }
  reduceAndSetList();
}

function setUpForQuiz() {
  console.log('setup');
  const quizBar = document.querySelector('.quiz-creator');
  quizBar.style.display = 'flex';
  const flashcards = document.querySelectorAll('.flashcard');
  flashcards.forEach(flashcard => {
    flashcard.classList.add('pointer');
    flashcard.addEventListener('click', () => addToList(flashcard));
  });
}

function init() {
  document.querySelector('#createquiz').addEventListener('click', setUpForQuiz);
}

document.addEventListener('DOMContentLoaded', init);
