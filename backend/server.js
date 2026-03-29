const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/pages', require('./routes/pageRoutes'));

// Public Read APIs
app.use('/api/public', require('./routes/publicRoutes'));

app.get('/', (req, res) => {
    res.send('FixThatError Backend API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
