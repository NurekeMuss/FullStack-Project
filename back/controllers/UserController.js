import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


import UserModel from '../modules/user.js';
export const register = async (req, res) => {
    try{
   
     
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
   
}

export const login = async (req, res) => {
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
  }

export const getMe = async (req, res) =>{
    try{
      const user = await UserModel.findById(req.userId);
      if(!user){
        return res.status(404).json({
          message:"no user",
        })
      }
  
     const { passwordHash, ...userData } = user._doc;
  
    res.json(userData);
  
    }catch (err){
      console.log(err);
      res.status(500).json({
        message:"no acccess",
      })
    }
  }