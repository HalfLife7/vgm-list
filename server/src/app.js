// initial setup - https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/
// include @babel/plugin-transform-runtime > fix ReferenceError regeneratorRuntime is not defined > https://github.com/babel/babel/issues/9849
// install cors > fix vue axios request error (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)
// add quotations around 'NODE_ENV=development' to fix undefined error - https://stackoverflow.com/questions/11104028/process-env-node-env-is-undefined

// .env workaround for heroku
// https:stackoverflow.com/questions/59759085/heroku-failed-to-load-env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index";
import gamesRouter from "./routes/games";
import albumsRouter from "./routes/albums";
import albumTracksRouter from "./routes/albumTracks";
import platformsRouter from "./routes/platforms";
import platformLogosRouter from "./routes/platformLogos";
import collectionsRouter from "./routes/collections";
import gameScreenshotsRouter from "./routes/gameScreenshots";
import cron from "./cron";

// import history from 'connect-history-api-fallback';

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  cors({
    origin: process.env.CORS_URL,
  })
);

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/albums", albumsRouter);
app.use("/album-tracks", albumTracksRouter);
app.use("/platforms", platformsRouter);
app.use("/platform-logos", platformLogosRouter);
app.use("/collections", collectionsRouter);
app.use("/game-screenshots", gameScreenshotsRouter);

module.exports = app;
