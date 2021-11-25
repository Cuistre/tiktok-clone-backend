import express from 'express';
import mongoose from 'mongoose';

import Data from './data.js';
import Videos from './dbModel.js';

import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;

const corsOptions = {
  origin: '*',
  //   origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Acess-Control-Allow-Origin', '*'),
    res.setHeader('Acess-Control-Allow-Origin', '*'),
    next();
});

const connection_url =
  'mongodb+srv://devLeCuistre:Messinumber10!@cluster0.prwwb.mongodb.net/tiktok?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useCreateIndex: true,
});

app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/v1/posts', (req, res) => res.status(200).send(Data));

app.get('/v2/posts', (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/v2/posts', (req, res) => {
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () =>
  console.log(`listening on localhost: ${port}`)
);
