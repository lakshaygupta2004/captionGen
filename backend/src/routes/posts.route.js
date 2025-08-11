const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const createPostController = require("../controller/createPost.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({storage: multer.memoryStorage() });
router.post("/generate", authMiddleware, upload.single("image"), createPostController);

module.exports = router;