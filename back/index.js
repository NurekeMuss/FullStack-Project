/* using insomnia for CRUD*/
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {registerValidaation} from './validation/auth.js'
import { validationResult } from "express-validator";

/* connection to monogodb */
mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.2re14nq.mongodb.net/'
    ).then(() => {
        console.log('db connection')
    }).catch((err) =>{
        console.log('error connecting to db', err )
    })
    
const app = express();

app.use(express.json());//read json req 

/* get Login and password through json  */
app.post('/auth/register', registerValidaation, (req, res) => {
  const errors = validationResult(req) // req all errors 
  
  if(!errors.isEmpty()){ //checking validation
    return res.status(400).json(errors.array())
  }  
  res.json({
    success: true, 
  })

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
/* ====================== */