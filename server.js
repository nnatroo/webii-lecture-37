import express from "express";
import cors from "cors";
import {connectToDatabase} from "./services/database.js";
import bodyParser from "body-parser";
import {ObjectId} from "mongodb";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/users', async (req, res) => {
  async function run() {
    try {
      const database = await connectToDatabase();
      const users = database.collection('users');
      const cursor = users.find();
      const result = await cursor.toArray()

      res.json(result);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }

  run().catch(console.dir);
});

app.post('/api/users', async (req, res) => {
  async function run() {
    try {
      const database = await connectToDatabase();
      const users = database.collection('users');
      const doc = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
      const result = await users.insertOne(doc);

      res.json(result);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }

  run().catch(console.dir);
});

app.get('/api/theaters', async (req, res) => {
  async function run() {
    try {
      const database = await connectToDatabase();
      const theaters = database.collection('theaters');
      const cursor = theaters.find();
      const result = await cursor.toArray()

      res.json(result);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }

  run().catch(console.dir);
});

app.get('/api/comments', async (req, res) => {
  async function run() {
    try {
      const database = await connectToDatabase();
      const comments = database.collection('comments');
      const cursor = comments.find();
      const result = await cursor.toArray()

      res.json(result);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }

  run().catch(console.dir);
});

app.post('/api/comments', async (req, res) => {
  async function run() {
    try {
      const database = await connectToDatabase();
      const comments = database.collection('comments');
      const date  = new Date();
      const movieObjectId = new ObjectId(req.body.movie_id)
      const doc = {
        name: req.body.name,
        email: req.body.email,
        movie_id: movieObjectId,
        text: req.body.text,
        date: date,
      }
      const result = await comments.insertOne(doc);

      res.json(result);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }

  run().catch(console.dir);
});

app.get('/api/embeddedMovies', async (req, res) => {
  async function run() {
    try {
      const database = await connectToDatabase();
      const embeddedMovies = database.collection('embedded_movies');
      const cursor = embeddedMovies.find().limit(50);
      const result = await cursor.toArray()

      res.json(result);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }

  run().catch(console.dir);
});

app.get('/api/movies', async (req, res) => {
  async function run() {
    try {
      const database = await connectToDatabase();
      const movies = database.collection('movies');
      const cursor = movies.find().limit(50);
      const result = await cursor.toArray()

      res.json(result);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }

  run().catch(console.dir);
});

app.get('/api/sessions', async (req, res) => {
  async function run() {
    try {
      const database = await connectToDatabase();
      const sessions = database.collection('sessions');
      const cursor = sessions.find().limit(50);
      const result = await cursor.toArray()

      res.json(result);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }

  run().catch(console.dir);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
