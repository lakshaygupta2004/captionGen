const postModel = require("../models/posts.model");
const {generateCaption} = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const {v4: uuidv4} = require("uuid");

async function createPostController(req, res) {
    const file = req.file;
    const base64Image = new Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64Image);
    const uploaded = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
        caption,
        image: uploaded.url,
        user: req.user._id
    })

    res.status(201).json({
        message: "Pose created",
        post
    })
}

module.exports = createPostController;