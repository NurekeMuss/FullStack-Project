import { body } from "express-validator";

export const registerValidaation = [
    body("email",'Wrong format of email').isEmail(),
    body("password" , 'Password should contain min 5 symbolss').isLength({min:5}),
    body("fullName", 'Write your name ').isLength({min:3}),
    body("avatarURl",'Wrond URL to avatar').optional().isURL(),
];