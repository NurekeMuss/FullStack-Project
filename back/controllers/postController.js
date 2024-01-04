/* CRUD OPERATIONS FOR POSTS */

import PostModel from '../modules/Post.js'

export const create = async (req, res) =>{
    try{
        const doc = new PostModel({
            tittle: req.body.tittle,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()
        res.json(post)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "cannot create your post "
        })
    }
}


//body - это то что передает user 

