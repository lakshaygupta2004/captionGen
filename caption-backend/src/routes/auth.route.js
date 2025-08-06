const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const salt = 10;

router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
       return res.status(401).json({message: "Invalid Credentials"});
    }

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


router.get('/check-auth', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.json({ isAuthenticated: false });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return res.json({ isAuthenticated: true, user: decoded });
  } catch (err) {
    return res.json({ isAuthenticated: false });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});



module.exports = router;