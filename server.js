const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.set('view engine', 'ejs');
app.set('views',  'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index', {
    auth: (req.user) ? true : false,
  });
});

const flashcardsRouter = require('./routes/flashcards-routes');
app.use('/flashcards', flashcardsRouter);
const keywordsRouter = require('./routes/keyword-routes');
app.use('/keywords', keywordsRouter);
const quizRouter = require('./routes/quiz-routes');
app.use('/quizzes', quizRouter);
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

app.use('*', (req, res) => {
  res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
});
