const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const users = require('./routes/api/users.js');
const profile = require('./routes/api/profile.js');
const posts = require('./routes/api/posts.js');

//DB CONFIG

const db = require('./config/keys.js').mongoURI;

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('Connected!')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));