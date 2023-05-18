require('dotenv').config();

const express = require('express');

const app = express();

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const NotFound = require('./errors/NotFound404');
const { loginUser, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorsMiddleware } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  createUserValidation,
  loginValidation,
} = require('./validationJoy/validationUser');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => { console.log('database ok'); })
  .catch(() => { console.log('database err'); });

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

// eslint-disable-next-line no-console
app.listen(PORT, () => { console.log(`start server:${PORT}`); });
