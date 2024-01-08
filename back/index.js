/* using insomnia for request*/
import express, { request } from 'express';
import mongoose from 'mongoose';
import multer from 'multer'
import cors from 'cors';

import {registerValidaation, loginValidator,postCreateValidaation} from './validation.js'

import {UserController,PostController} from './controllers/index.js'

import {handleValidationErrors,checkAuth} from './utils/index.js'

/* connection to monogodb */
mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.2re14nq.mongodb.net/blog'
    ).then(() => {
        console.log('db connection')
    }).catch((err) =>{
        console.log('error connecting to db', err )
    })
    
const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null,'uploads')
    },

    filename:(_, file, cb) =>{
        cb(null, file.originalname)
    },

})

const upload = multer({ storage })

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json());//read json req 

/* PART 1  */

/* Create login */
app.post('/auth/login',loginValidator,handleValidationErrors,UserController.login)

/* get Login and password through json  */
app.post('/auth/register',registerValidaation, handleValidationErrors, UserController.register)

/* Function middleware(посредник) checkAuth */
app.get('/auth/me',checkAuth, UserController.getMe)

app.post('/upload',checkAuth, upload.single('image'),(req,res) =>{
    res.json({
        url :`/uploads/${req.file.originalname}`,
    })
})

/* PART 2  */

/* ALL HAVE ACCESS */
app.get('/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)

/* ONLY WHO REGISTER */
app.post('/posts',checkAuth,postCreateValidaation, handleValidationErrors,  PostController.create)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id',checkAuth, handleValidationErrors,  PostController.update)


/* PART 3 */
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