import './config.mjs';
import mongoose from 'mongoose';

const dbConnection = mongoose
    .connect(process.env.MONGO_URI, {
    })
    .then(() => console.log('MongoDB database Connected Adam...'))
    .catch((err) => console.log(err))

const BugReport = new mongoose.Schema({
    id: Number,
    title: String,
    addedBy: String,
    timestamp: { type: Date, default: Date.now },
    priority: String,
    tags: [String],
    comments: [Number],
    resolution: Number,
    description: String,
});

mongoose.model('BugReport', BugReport);

const User = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    lists: [Number],
  });
  
mongoose.model('User', User);

const Comment = new mongoose.Schema({
    id: Number,
    bugId: String,
    comment: String,
    addedBy: String,
    timestamp: { type: Date, default: Date.now },
});

mongoose.model('Comment', Comment);

const Solution = new mongoose.Schema({
    id: Number,
    bugId: String,
    resolvedBy: String,
    resolutionDetail: String,
    status: String,
    verifiedBy: String,
    timestamp: { type: Date, default: Date.now },
});

mongoose.model('Solution', Solution);

export default dbConnection;