const express = require('express');
const axios = require('axios');
const router = express.Router();
const passport = require('passport');
// Routes
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get("/auth/linkedin/callback", async (req, res) => {
  try {
    const client_id = process.env.LINKEDIN_CLIENT_ID;
    const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
    console.log(req.query.id);
    const code = req.query.code;
    console.log("code--> ", code);

    const redirect_uri = "http://localhost:5000/api/auth/linkedin/callback";
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

module.exports = router;