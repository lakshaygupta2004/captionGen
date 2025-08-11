require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = require("./src/app");
const dbConfig = require("./src/db/db");
const authRouter = require("./src/routes/auth.route");
const postRouter = require("./src/routes/posts.route");

const CLIENT_ORIGIN = 'https://caption-gen-eta.vercel.app'; // your allowed frontend URL

// CORS whitelist - add more if needed
const allowedOrigins = [CLIENT_ORIGIN];

// CORS options with origin function and error handling
const corsOptions = {
  origin: function (origin, callback) {
    console.log('Incoming request origin:', origin);
    // Allow requests with no origin like mobile apps or curl (optional)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204, // some legacy browsers choke on 204
};

// Apply CORS middleware early
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests explicitly (optional but good practice)
app.options('*', cors(corsOptions));

app.use(cookieParser());

// Your routes
app.use("/auth", authRouter);
app.use("/api/post", postRouter);

// Optional: A simple root route for sanity check
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

const PORT = process.env.PORT || 5000;

dbConfig();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Optional: Global error handler for CORS and others
app.use((err, req, res, next) => {
  if (err.message && err.message.startsWith('CORS policy')) {
    return res.status(403).json({ error: err.message });
  }
  // Pass other errors along
  next(err);
});
