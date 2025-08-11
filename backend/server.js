require('dotenv').config();

const app = require("./src/app");
const cors = require("cors");
const dbConfig = require("./src/db/db");
const authRouter = require("./src/routes/auth.route");
const postRouter = require("./src/routes/posts.route");
const cookieParser = require("cookie-parser");
app.use(cors({
    origin: 'https://caption-gen-eta.vercel.app', // allow requests from the client URL
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    credentials: true,               // allow cookies
  }));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api/post", postRouter);
const PORT = process.env.PORT || 5000;

dbConfig();
app.listen(PORT, () => {
    console.log("Server started");
});

