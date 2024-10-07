const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const eventAndJobRoutes = require('./routes/eventAndJobRoutes');
const collegeRotues = require('./routes/collegeRoutes');
const userRoutes = require('./routes/userRoutes');
const linkedinRoutes = require('./routes/linkedRoute');
const fundraiserRoutes = require('./routes/fundraiserRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const axios = require('axios');
const jwt = require('jwt-simple');
const { authenticate } = require('./middleware/authenticate');
const verifyTokenFromCookie = require('./middleware/verifyToken');
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
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport setup
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/linkedin/callback',
            scope: ['openid', 'profile', 'email'],
            state: true,
        },
        // print name and email
        async (accessToken, refreshToken, profile, done) => {
            done(null, user);
        }
    )
);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api', eventAndJobRoutes);
app.use('/api/fundraiser', fundraiserRoutes);
app.use('/api', collegeRotues);
app.use('/api', userRoutes);
app.use('/api', linkedinRoutes);
app.use('/api/alumni', alumniRoutes);
// Start the server
app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Welcome to the server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
