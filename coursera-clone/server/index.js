//create folder server
//create index.js
//cd server
//yarn add express nodemon mongoose bcryptjs jsonwebtoken cors dotenv

const express = require('express');
const cors=require('cors');
const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const UserModel = require("./models/UserModel");
const app=express();
require('dotenv').config();

const bcryptSalt=bcrypt.genSaltSync(8);

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5175',
}));

//connect to the database
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

app.post('/signup', async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        //create user in the database
        const userInfo = await UserModel.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userInfo);
    }
    catch(e){
        res.status(422).json(e);
    }
    //response

});

app.post('/login', async (req,res)=>{
    const {loginEmail,loginPassword}=req.body;
    const email=loginEmail;
    const password=loginPassword;
    console.log('email');
    console.log(email);
    console.log('password');
    console.log(password);
    //find user with this email in the databse
    const userInfo = await UserModel.findOne({email})
    if(userInfo)    {
        const passOk=bcrypt.compareSync(password,userInfo.password)
        if(passOk){
            const accessToken = generateAccessToken(userInfo);
            console.log('accessToken');
            console.log(accessToken);
            const refreshToken=generateRefreshToken(userInfo);
            console.log('refreshToken');
            console.log(refreshToken);
            //send accessToken back to frontend
            res.json({accessToken});
            //to-do:add refreshToken

        }
        else{
            res.status(422).json('password is incorrect');
        }
    }
    else{
        res.json('user not found');
    }

});

app.get('/profile',authenticateToken,async (req,res)=> {
    res.json(req.user);

});

function authenticateToken(req,res,next){
    //token is coming from the http header
    //check if bearer, in the beginning smt like this: if (req.headers.authorization?.split(" ")[0] === "Bearer") {} why?
    const authHeader=req.headers.authorization;
    const accessToken = authHeader.split(" ")[1]
    if (accessToken==null){
        return res.sendStatus(401);
    }
    else{
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,async (err,user)=>{
            //can I give next only info from token or is it okay to extract like this?
            if (err) res.sendStatus(403);
            console.log('user');
            console.log(user);
            const {email}=user.email;
            const userInfo = await UserModel.findOne(email);
            req.user=userInfo;
            next()
        });
    }

}

function generateAccessToken(userInfo){
    return jwt.sign({email:userInfo.email, id:userInfo._id,},process.env.ACCESS_TOKEN_SECRET,{});//15m
}
function generateRefreshToken(userInfo){
    return jwt.sign({email:userInfo.email, id:userInfo._id,},process.env.REFRESH_TOKEN_SECRET,{});
}

app.listen(3000);