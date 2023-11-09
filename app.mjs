import express from 'express'
import './config.mjs';
import './db.mjs';
import bodyParser from 'body-parser';

const app = express();

// set up express static
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// body parser setup
app.use(express.urlencoded({ extended: false }));

// DB setup
import mongoose from 'mongoose';
const User = mongoose.model('User');

app.use(express.static(path.join(__dirname, 'public')));

console.log(mongoose.connection.readyState);

app.get('/', async (req,res) =>{
  console.log("I was called");
  try {
    const newUser = {
      name: "Adam",
      username: "adam",
      lists: [],
    }
    console.log(req.query);;
    newUser.password = req.query['pwd'];
    await User.create(newUser);
    res.send("User added");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred: database error. ADD USER FAILED');
  }
})

// app.get('/', (req, res) => {
//   console.log("I was called");
//   res.send('Hello world!2');
// });
// serve static files

app.listen(process.env.PORT || 3000);
