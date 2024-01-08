import { validationResult } from "express-validator";

export default (req, res, next) =>{
    const errors = validationResult(req) // req all errors 
     
    if(!errors.isEmpty()){ //checking validation
      return res.status(400).json(errors.array())
    }  

    next()
}