// initial setup - https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/
// include @babel/plugin-transform-runtime > fix ReferenceError regeneratorRuntime is not defined > https://github.com/babel/babel/issues/9849
// install cors > fix vue axios request error (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import gamesRouter from './routes/games';

//import history from 'connect-history-api-fallback';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors({
    origin: 'http://localhost:8080'
}));

app.use('/', indexRouter);
app.use('/games', gamesRouter);

module.exports = app;