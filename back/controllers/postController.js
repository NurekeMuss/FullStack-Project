/* CRUD OPERATIONS FOR POSTS */

import PostModel from '../modules/Post.js'


export const getAll = async (req,res) => {
    try{
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Error"
        })
        }
    }

export const getOne = async (req,res) => {
    try{
      const postId = req.params.id;

      PostModel.findOneAndUpdate(
        {
            _id: postId,
        },
        {
            $inc:{viewsCount: 1},
        },
        {
            returnDocuments: 'after',
        },
        (err, doc) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message:"we can provide article",
                })
            }

            if(!doc){
                return res.status(404).json({
                    message:"can not find article",
                })
            }

            res.json(doc)
        },
      )
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Error"
        })
        }
    }



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

