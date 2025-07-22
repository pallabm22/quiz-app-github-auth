const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Step 1: Redirect to GitHub
app.get("/auth/github", (req, res) => {
  const redirect_uri = "http://localhost:4000/auth/github/callback";
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}`);
});

app.get('/logout', (req, res) => {
  res.redirect('http://localhost:5173/logout');
});



// Step 2: GitHub callback -> Get access token and user
app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      },
      { headers: { Accept: "application/json" } }
    );

    const access_token = tokenRes.data.access_token;

    const userRes = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: `token ${access_token}` },
    });

    res.redirect(`http://localhost:5173/quiz?user=${encodeURIComponent(JSON.stringify(userRes.data))}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("GitHub Authentication failed.");
  }
});

app.listen(4000, () => console.log("Backend running at http://localhost:4000"));
