const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const port = process.env.PORT || 8003;
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/brunda', {

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Import the 'cors' middleware
const cors = require('cors');
const blogPostRoutes = require('./pages/api/blogpost.js');

 
  // Setting up CORS option
app.use(
  cors({
    origin:'http://localhost:3000',
    methods:["GET", "POST", "DELETE", "PUT"]
  })
);

// Middleware for handling JSON data
app.use(express.json());

//API routes
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/signup', require('./routes/signupRoutes.js'));
app.use('/api/login', require('./routes/loginRoutes.js'));
app.use('/api/blogpost',  require('./routes/blogRoutes'));
app.use('/api', require('./routes/userRoutes'));

app.get('/favicon.ico', (req, res) => {
  res.status(204);
});

// Root routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
