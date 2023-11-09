import express from 'express';
import cors from 'cors';
import './config.mjs';
import './db.mjs';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
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

app.post('/api/newBugReport', async (req,res) =>{
  try {
    const formData = req.body;
    console.log(formData);

    // const newBugReport = {
    //   title: "New Bug Report",
    //   tags: ["tag1", "tag2"],
    //   priority: "high",
    //   addedBy: "Adam",
    // }
    const newBugReport = {
      title: formData.title,
      tags: formData.tags,
      priority: formData.priority,
      addedBy: "Adam"
    }
    await BugReport.create(newBugReport);
    res.status(200).json(formData);
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
