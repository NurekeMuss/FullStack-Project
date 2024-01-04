import { body } from "express-validator";

export const loginValidator = [
    body("email",'Wrong format of email').isEmail(),
    body("password" , 'Password should contain min 5 symbolss').isLength({min:5}),
];
export const registerValidaation = [
    body("email",'Wrong format of email').isEmail(),
    body("password" , 'Password should contain min 5 symbolss').isLength({min:5}),
    body("fullName", 'Write your name ').isLength({min:3}),
    body("avatarURl",'Wrond URL to avatar').optional().isURL(),
];
export const postCreateValidaation = [
    body("tittle",'Input your tittle').isLength(3).isString(),
    body("text" , 'Input your text').isLength({min:3}).isString(),
    body("tags", 'Wrong format tags (request array)').optional().isString(),
    body("imageURl",'Wrond URL image to post').optional().isString(),
];