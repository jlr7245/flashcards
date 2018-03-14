module.exports = [
  {
    id: '',
    question: 'What command do you use to make a new file?',
    answer: 'touch [filename]',
    category: 'CLI',
    difficulty: 1
  },
  {
    id: '',
    question: 'What are the primitive JavaScript datatypes?',
    answer: 'string, number, boolean, null, undefined, symbol (new in ES6)',
    category: 'JS Basics',
    difficulty: 1
  },
  {
    id: '',
    question: 'What is the difference between null and undefined?',
    answer: 'Null is set specifically when there is no value on purpose while undefined means the value has not been set or defined yet.',
    category: 'JS Basics',
    difficulty: 2
  },
  {
    id: '',
    question: 'What does `box-sizing: border-box` do?',
    answer: 'All html elements follow the box model. Normally, when giving an html element height and width, the sizing only effects the content area. The `box-sizing: border-box` property allows the width and height properties to include the content, padding, and border (but not the margin!).',
    category: 'CSS',
    difficulty: 2
  },
  {
    id: '',
    question: 'What\'s the difference between a function expression and a function declaration?',
    answer: 'Both function expressions and function declarations fundamentally work the same. Function expressions, however are (a) not hoisted and (b) mutable. Because function expressions are part of a larger expression syntax (e.g.: a variable assignment), it can be reassigned. Function declarations, on the other hand, do not require a variable assignment and are hoisted. Since function declarations are hoisted, this means that a function can be called before it is defined, due to the fact that JavaScript files are parsed through before they are ran.',
    category: 'JS Basics',
    difficulty: 1
  },
  {
    id: '',
    question: 'What does the `return` keyword do?',
    answer: 'The return keyword executes and returns the value from a function, if you don\'t input a value for your return, you get undefined',
    category: 'JS Basics',
    difficulty: 1
  },
  {
    id: '',
    question: 'What is the purpose of writing pseudocode?',
    answer: 'It\'s a good way to have programatic thinking without caring about syntax. Writing pseudocode can have clearer instructions before we write the real codes',
    category: 'Programming',
    difficulty: 1
  },
  {
    id: '',
    question: 'What position properties remove an element from the normal document flow?',
    answer: 'position: absolute and position: fixed',
    category: 'CSS',
    difficulty: 2
  },
  {
    id: '',
    question: 'What\'s the difference between display: none and visibility: hidden?',
    answer: 'Elements with display: none will not take up any space on the page. Elements with visibility: hidden will take up space on the page.',
    category: 'CSS',
    difficulty: 3
  },
  {
    id: '',
    question: 'What\'s the difference between document.getElementById and document.querySelectorAll?',
    answer: 'document.getElementsByClassName - Returns an array-like object of all child elements which have all of the given class names. document.querySelectorAll - Returns a list of the elements within the document that match the specified group of selectors. The object returned is a nodelist.',
    category: 'DOM manipulation',
    difficulty: 2
  },
  {
    id: '',
    question: 'What are the four pseudo-elements?',
    answer: '::before, ::after, ::first-letter, ::first-line',
    category: 'CSS',
    difficulty: 1
  },
  {
    id: '',
    question: 'What is a constructor function?',
    answer: 'A function that instantiates a new object with a specific set of properties outlined within.',
    category: 'JS Basics',
    difficulty: 3
  },
  {
    id: '',
    question: 'Describe the map method.',
    answer: 'An array method that enacts a callback on each element of the array and returns a new array.',
    category: 'JS Basics',
    difficulty: 2
  },
  {
    id: '',
    question: 'What is jQuery?',
    answer: 'jQuery is a JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.',
    category: 'jQuery',
    difficulty: 1
  },
  {
    id: '',
    question: 'What are acceptance criteria? Why are they important?',
    answer: 'Acceptance criteria are the criteria that needs to be fulfilled for the user story to be finished.',
    category: 'Programming',
    difficulty: 2
  },
  {
    id: '',
    question: 'What is an API?',
    answer: 'A set of tools, protocols, and set of generated or fixed data. API tells code how to interact, and are used when making things that are to be used by people for tasks. APIs also simplify the programing process by providing "everything you need", after which a programmer then puts these things together.',
    category: 'Programming',
    difficulty: 1
  },
  {
    id: '',
    question: 'What are the HTTP verbs?',
    answer: 'delete, get, post, put, patch, and a few others',
    category: 'Programming',
    difficulty: 1
  },
  {
    id: '',
    question: 'What is AJAX?',
    answer: 'AJAX = asynchornous js and xml and it can request and receive data from servers.',
    category: 'Programming',
    difficulty: 1
  },
  {
    id: '',
    question: 'What is SQL?',
    answer: 'Structured Query Language. It is used to communicate with a database.',
    category: 'SQL',
    difficulty: 1
  },
  {
    id: '',
    question: 'What is the difference between SQL, PostgreSQL, and psql?',
    answer: 'SQL is the query language. PostgreSQL is the database management system. psql is the terminal program that allows you to connect to postgres.',
    category: 'SQL',
    difficulty: 3
  },
  {
    id: '',
    question: 'Who was the createor of JavaScript?',
    answer: 'Brendan Eich',
    category: 'JS Basics',
    difficulty: 1
  },
  {
    id: '',
    question: 'What is the difference between a method and a function?',
    answer: 'a method is a function within an object. A function takes place outside an object.',
    category: 'JS Basics',
    difficulty: 1
  },
  {
    id: '',
    question: 'What is the difference between =, ==, and ===?',
    answer: '"=" assigns a value to a variable, "==" tests equality but uses type coercion, "===" tests for exact equality',
    category: 'JS Basics',
    difficulty: 1
  },
  {
    id: '',
    question: 'What\'s the difference between let, var, and const?',
    answer: 'let and const have block scope. var has function scope. also, const values cannot be modified. let would be used when access to it is needed only within the block it is contained. const would be used when you won\'t be chaning the value of it in the future. it is best practice not to use var (var declarations inside an innermost for loop for example would be accessible outside the block (within the function) which can create bugs if the program is not designed properly',
    category: 'JS Basics',
    difficulty: 2
  },
  {
    id: '',
    question: 'What is the "this" keyword?',
    answer: 'It\'s used within methods and constructors to refer to the object that\'s being acted upon or constructed.',
    category: 'JS Basics',
    difficulty: 2
  },
  {
    id: '',
    question: 'How do arrow functions affect scope?',
    answer: 'Arrow functions do not have their own `this`. Instead, when using `this` in an arrow function, it refers to the scope that the arrow function sits inside.',
    category: 'JS Basics',
    difficulty: 4
  },
  {
    id: '',
    question: 'What is the `new` keyword?',
    answer: 'new instantiates a new object that follows it and calls its constructor function based on the arguments it is given.',
    category: 'JS Basics',
    difficulty: 2
  },
  {
    id: '',
    question: 'Why do you need to include the "meta-viewport" tag in your HTML?',
    answer: 'Setting up the viewport (assuming you\'re referring to the meta tag) allows the document to know how to behave depending on the different screen sizes. It\'s useful for responsive design.',
    category: 'HTML',
    difficulty: 1
  }
]