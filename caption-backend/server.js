require('dotenv').config();

const app = require("./src/app");
const cors = require("cors");
const dbConfig = require("./src/db/db");
const authRouter = require("./src/routes/auth.route");
const postRouter = require("./src/routes/posts.route");
const cookieParser = require("cookie-parser");
app.use(cors({
    origin: "http://localhost:5173", // your frontend dev URL
    credentials: true,               // allow cookies
  }));
app.use(cookieParser());
app.use("/auth", authRouter); 
app.use("/api/post", postRouter);

dbConfig();
app.listen(3000, () => {
    console.log("Server started");
});

