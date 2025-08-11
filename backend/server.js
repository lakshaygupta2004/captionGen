require('dotenv').config();

const app = require("./src/app");
const cors = require("cors");
const dbConfig = require("./src/db/db");
const authRouter = require("./src/routes/auth.route");
const postRouter = require("./src/routes/posts.route");
const cookieParser = require("cookie-parser");
app.use(cors({
    origin: 'https://caption-gen-one.vercel.app', // replace with your frontend URL
    credentials: true // allow credentials to be sent
  }));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api/post", postRouter);
const PORT = process.env.PORT || 5000;

dbConfig();
app.listen(PORT, () => {
    console.log("Server started");
});