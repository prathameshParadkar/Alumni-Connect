const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const eventAndJobRoutes = require('./routes/eventAndJobRoutes');
const collegeRotues = require('./routes/collegeRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const allowedOrigins = ['http://localhost:3000'];

// CORS middleware configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow sending cookies
};
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api', eventAndJobRoutes);
app.use('/api', collegeRotues);
app.use('/api', userRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
