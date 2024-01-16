/* CRUD OPERATIONS FOR POSTS */

import PostModel from '../modules/Post.js'

export const getLastTags = async (req,res) => {
    try{
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.
        map(obj  => obj.tags)
        .flat()
        .slice(0,5) 

        res.json(tags)
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Error"
        })
        }
}
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
      const postId = await req.params.id;

      awaitPostModel.findOneAndUpdate(
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
      ).populate()
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Error"
        })
        }
 } 


export const remove = async (req, res) => {
    try{
        const postId = await req.params.id

       await PostModel.findOneAndDelete({
            _id: postId,
        },(err,doc) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    message:"we cannot deletearticle",
                })
            }

            if(!doc){
                return res.status(404).json({
                    message:"can not find article"
                })
            }

            res.json({
                success: true,
            })
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "cannot remove article"
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


export const update = async (req, res) => {
    try{
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        },{
            tittle: req.body.tittle,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags,
        });


        res.json({
            success: true,
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "cannot update post"
        })
    }
}


//body - это то что передает user 

