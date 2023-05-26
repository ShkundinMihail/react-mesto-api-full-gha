/* eslint-disable no-console */

// require('dotenv').config();

const express = require('express');

const app = express();
// const {PORT = (3000+Math.floor(Math.random()*100))} = process.env;
const { PORT = 3001 } = process.env;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const NotFound = require('./errors/NotFound404');
const { loginUser, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorsMiddleware } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./corsOptions/corsOptions');
const {
  createUserValidation,
  loginValidation,
} = require('./validationJoy/validationUser');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => { console.log('database ok'); })
  .catch(() => { console.log('database err'); });
// app.use(cors());
app.options('*', cors({
  origin: corsOptions,
  credentials: true,
}));

app.use(express.json())
  .use(cors({
    origin: corsOptions,
    credentials: true,
  }));
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('The server is about to fail');
  }, 0);
});

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, loginUser);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.use('*', (req, res, next) => { next(new NotFound('URL not found')); });
app.use(errorLogger);
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT, () => { console.log(PORT); });
