const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const axios = require('axios');
const jwt = require('jwt-simple');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
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
      callbackURL: 'https://2d0f-2409-4040-e06-2c3a-8437-a7cf-cdac-dad9.ngrok-free.app/auth/linkedin/callback',
      scope: ['openid', 'profile', 'email'],
      state: true,
    },
    // print name and email
    async (accessToken, refreshToken, profile, done) => {
      done(null, user);
    }
  )
);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/auth/linkedin', passport.authenticate('linkedin'));

app.get("/auth/linkedin/callback", async (req, res) => {
  try {
    const client_id = process.env.LINKEDIN_CLIENT_ID;
    const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
    console.log(req.query.id);
    const code = req.query.code;
    console.log("code--> ", code);

    const redirect_uri = "https://2d0f-2409-4040-e06-2c3a-8437-a7cf-cdac-dad9.ngrok-free.app/auth/linkedin/callback";
    let access_token;

    // Step 2: Access Token Retrieval
    const access_token_url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`;
    
    // Make POST request to exchange authorization code for access token
    const responseToken = await axios.post(access_token_url);
    access_token = responseToken.data.access_token;

    // Step 3: Fetching User Data
    const user_info_url = `https://api.linkedin.com/v2/userinfo`;
    
    // Make GET request to fetch user information using access token
    const responseUserInfo = await axios.get(user_info_url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user_info = responseUserInfo.data;
    console.log("user_info-->", user_info);
    return res.json(user_info);
  } catch (error) {
    // Handle errors gracefully
    console.error("Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});





// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
