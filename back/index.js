/* using insomnia for CRUD*/
import express, { request } from 'express';
import mongoose from 'mongoose';

import {registerValidaation, loginValidator,postCreateValidaation} from './validation.js'

import checkAuth from './utils/checkAuth.js';

import * as UserController  from './controllers/UserController.js'
import * as PostController from './controllers/postController.js'
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
app.post('/auth/login', loginValidator,UserController.login)
/* get Login and password through json  */
app.post('/auth/register', registerValidaation, UserController.register)
/* Function middleware(посредник) checkAuth */
app.get('/auth/me',checkAuth, UserController.getMe)


//app.get('/posts', PostController.getAll)
//app.get('/posts/:id', PostController.getOne)
app.post('/posts',checkAuth,postCreateValidaation, PostController.create)
//app.delete('/posts', PostController.remove)
//app.patch('/posts', PostController.update)


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