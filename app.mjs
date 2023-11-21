import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import bcrypt from 'bcrypt';
import cors from 'cors';
import './config.mjs';
import './db.mjs';
import bodyParser from 'body-parser';
import url from 'url';
import path from 'path';
import mongoose from 'mongoose';


const app = express();
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173', // Adjust to match the address of your Vue.js app
//   credentials: true,
// }));
app.use(bodyParser.json());
// set up express static

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// body parser setup
app.use(express.urlencoded({ extended: false })); // maybe true?
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const mockUser = {
  id: 1,
  username: 'testuser',
  password: '$2b$10$UNnTJNr7KQ1E1nLKMXl1kOc/f8.49WQUZR17NKLzrw3qHLpxunNve', // Hashed password
};

// PASSPORT SETUP
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Mock user lookup (replace with a database query)
    if (username === mockUser.username) {
      bcrypt.compare(password, mockUser.password, (err, res) => {
        if (res) {
          return done(null, mockUser);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    } else {
      return done(null, false, { message: 'Incorrect username.' });
    }
  }
));

// Serialization and deserialization (replace with database queries)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (id === mockUser.id) {
    done(null, mockUser);
  } else {
    done({ message: 'User not found' }, null);
  }
});


// DB setup
const User = mongoose.model('User');
const BugReport = mongoose.model('BugReport');
const Solution = mongoose.model('Solution');

app.use(express.static(path.join(__dirname)));

console.log(mongoose.connection.readyState);

// ROUTES
app.post('/api/newBugReport', async (req,res) =>{
  try {
    const formData = req.body;
    console.log(formData);

    const newBugReport = {
      title: formData.title,
      tags: formData.tags,
      priority: formData.priority,
      desscription: formData.description,
      addedBy: "Adam"
    }
    await BugReport.create(newBugReport);
    res.status(200).json(formData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred: database error. FILE BUGREPORT FAILED');
  }
});

app.get('/api/getBugReports', async (req,res) =>{
  try {
    const bugReports = await BugReport.find({});
    res.status(200).json(bugReports);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred: database error. GET BUGREPORTS FAILED');
  }
});

app.post('/api/newSolution', async (req,res) =>{
  try {
    const formData = req.body;
    console.log(formData);

    const newSolution = {
      bugId: formData.bugId,
      resolvedBy: formData.resolvedBy,
      resolutionDetail: formData.resolutionDetail,
      status: formData.status,
      verifiedBy: formData.verifiedBy,
    }
    await Solution.create(newSolution);
    res.status(200).json(formData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred: database error. FILE SOLUTION FAILED');
  }
});

// app.post('/api/login', passport.authenticate('local'), async (req, res) => {
app.post('/api/login', async (req, res) => {
  console.log('I was called');
  res.json({ message: 'Login successful', user: req.user });
});

app.post('/api/signup', async (req, res) => {
  const {username, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    lists: []
  });

  await newUser.save();

  res.json({ message: 'Signup successful', user: newUser });
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

app.get('/api/bug', async (req, res) => {
  const bugId = req.query.id;
  const bug = await BugReport.findById(bugId);
  res.json(bug);
});

app.get('/api/bugSolutions', async (req, res) => {
  const bugId = req.query.id;
  const solutions = await Solution.find({ bugId: bugId });
  res.json(solutions);
});


// app.get('/', (req, res) => {
//   console.log("I was called");
//   res.send('Hello world!2');
// });
// serve static files

app.listen(process.env.PORT || 3000);
