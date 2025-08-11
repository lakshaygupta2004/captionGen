require('dotenv').config();

const app = require("./src/app");
const cors = require("cors");
const dbConfig = require("./src/db/db");
const authRouter = require("./src/routes/auth.route");
const postRouter = require("./src/routes/posts.route");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: ['https://caption-gen-one.vercel.app'], // add dev origins too if needed
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // add others if you send them
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // explicit preflight handling
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api/post", postRouter);
const PORT = process.env.PORT || 5000;

dbConfig();
app.listen(PORT, () => {
    console.log("Server started");
});