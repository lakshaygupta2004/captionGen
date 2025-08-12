require('dotenv').config();

const app = require("./src/app");
const cors = require("cors");
const dbConfig = require("./src/db/db");
const authRouter = require("./src/routes/auth.route");
const postRouter = require("./src/routes/posts.route");
const cookieParser = require("cookie-parser");

// Allow both local and deployed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL // e.g., https://your-frontend.vercel.app
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api/post", postRouter);
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;

dbConfig();
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});