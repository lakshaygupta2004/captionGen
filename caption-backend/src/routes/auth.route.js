const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const salt = 10;

router.post("/register", async (req, res) => {
    const {username, password} = req.body;


    const userCheck = await userModel.findOne({username});
    if(userCheck){
        res.status(401).json({message: "username in use"});
        return;
    }

    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({username, password: hashPassword});

    if(user){
        const token = jwt.sign({username}, process.env.SECRET_KEY);
        res.cookie("token", token);

        res.status(201).json({message: "Registered Successfully"});
        return;
    }

    res.status(409).json({message: "Try again"});
});


router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await userModel.findOne({username});
    
    if(!user){
        res.status(404).json({message: "registeration required"});
        return;
    }

    const hashPassword = await bcrypt.compare(password, user.password);

    if(!hashPassword){
        res.status(401).json({message: "Password incorrect"});
        return;
    }

    const token = jwt.sign({username}, process.env.SECRET_KEY, {expiresIn: "1h"});

    res.cookie("token", token);

    res.status(201).json({message: "Login successfull"});


});


module.exports = router;