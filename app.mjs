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
const BugReport = mongoose.model('BugReport');

app.use(express.static(path.join(__dirname)));

console.log(mongoose.connection.readyState);



// app.get('/', async (req,res) =>{
//   console.log("I was called");
//   try {
//     const newUser = {
//       name: "Adam",
//       username: "adam",
//       lists: [],
//     }
//     console.log(req.query);;
//     newUser.password = req.query['pwd'];
//     await User.create(newUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error occurred: database error. ADD USER FAILED');
//   }
// });

app.post('/api/newBugReport', async (req,res) =>{
  try {
    const newBugReport = {
      title: req.body['title'],
      tags: req.body['tags'],
      priority: req.body['priority'],
    }
    await BugReport.create(newBugReport);
    res.status(200).send('Bug report filed successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred: database error. FILE BUGREPORT FAILED');
  }
});


// app.get('/', (req, res) => {
//   console.log("I was called");
//   res.send('Hello world!2');
// });
// serve static files

app.listen(process.env.PORT || 3000);
