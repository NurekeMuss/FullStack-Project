/* using insomnia for CRUD*/
import express, { request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

import {registerValidaation} from './validation/auth.js'
import { validationResult } from "express-validator";

import UserModel from './modules/user.js';
import checkAuth from './utils/checkAuth.js';
/* connection to monogodb */
mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.2re14nq.mongodb.net/blog'
    ).then(() => {
        console.log('db connection')
    }).catch((err) =>{
        console.log('error connecting to db', err )
    })
    
const app = express();

app.use(express.json());//read json req 


/* Create login */

app.post('/auth/login', async (req, res) => {
  try{
    const user = await UserModel.findOne({email:req.body.email}); 

    if(!user){
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if(!isValidPass){
      return res.status(400).json({
        message: 'Not correct password ot login ',
      })
    }

    const token = jwt.sign({
      _id:user._id,
    }, 
    'secret123',//ключ 
    {
    expiresIn:'30d', //deadline :)
    })

    const {passwordHash, ...userData} = user._doc

    res.json({
      ...userData,
      token})
    

  }catch (err){
    console.log(err);
    res.status(500).json({
      message:"cannot sorry registration",
    })
  }
})

/* get Login and password through json  */
app.post('/auth/register', registerValidaation, async (req, res) => {
 try{
  const errors = validationResult(req) // req all errors 
  
  if(!errors.isEmpty()){ //checking validation
    return res.status(400).json(errors.array())
  }  
  
/* Шифрование пароля  */
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);//Алгоритм шифрование 
  const hash = await bcrypt.hash(password,salt)//зашифрованный пароль


  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash:hash,
  })

  /* create user in db */
  const user = await doc.save()

/* get token  */
const token = jwt.sign({
  _id:user._id,
}, 
'secret123',//ключ 
{
expiresIn:'30d', //deadline :)
})

const {passwordHash, ...userData} = user._doc

  res.json({
    ...userData,
    token})

 }catch(err){
  console.log(err);
  res.status(500).json({
    message:"cannot registration",
  })
 }

})

/* Function middleware checkAuth */
app.get('/auth/me',checkAuth,  async (req, res) =>{
  try{
    const user = await UserModel.findById(req.userId);
    if(!user){
      return res.status(404).json({
        message:"no user",
      })
    }


   const {passwordHash, ...userData} = user._doc

  res.json(userData)

  }catch (err){
    console.log(err);
    res.status(500).json({
      message:"no acccess",
    })
  }
})

/* Connection to port */
app.listen(4444,(err) =>{
    if(err){
        return console.error(err);
    }
    console.log('server ok')
})







/* ==================== */
//req - будет храниться о том что мне прислал клиент 
//res - что я буду передовать клиенту

/* app.get('/', (req, res) => {
  res.send("hello world")
}) */

/* ====================== */