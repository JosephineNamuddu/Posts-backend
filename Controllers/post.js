const Post = require('../Models/post');

//create posts
const CreatePost = async (req, res) => {
    const PostData = req.body;

    const newPost = new Post({...PostData, creator: req.user._id, createdAt: new Date().toISOString()})
   
    try {
        await newPost.save(); //saves post in the database
        res.status(201).json({message: 'Post created successfully', result: newPost});
} catch (error) {
    res.status(500).json({message: 'Error while creating post', error: error.message});
        }
};

//fetch/read posts
const getPosts = async (req, res) => {
try {
    const posts = await Post.find();
    res.status(200).json({message: 'Posts fetched successfully', result: posts});
} catch (error) {
  res.status(500).json({message: 'Error while fetching posts', error: error.message});  
}
};
//updating APIs using a put request
const updatePost = async (req, res) => {
    const { id } = req.params; 
    const { title, content } = req.body;
    
    try {
        const existingPost = await Post.findById(id); //fetching the post
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });   
        }
         if (req.user._id.toString() !== existingPost.creator.toString()){
            return res.status(403).json({message: 'Unauthorised access, you are not the owner of this post'});
         }
         existingPost.title = title;
         existingPost.content = content;
         await existingPost.save();

         res.status(200).json({ message: 'Post updated successfully', result: existingPost});

        } catch (error) {
        res.status(500).json({ message: 'Error while updating post',error: error.message})
        }
    };
//1. Patch method of updating APIs
const patchPost = async (req, res) => {
    const { id } = req.params; 
    const { title, content} = req.body;
    
    try {
        const existingPost = await Post.findById(id); //fetching the post
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });   
        }
         if (req.user._id.toString()!== existingPost.creator.toString()){
            return res.status(403).json({message: 'Unauthorised access, you are not the owner of this post'});
         }
         if (title) existingPost.title = title;
         if (content) existingPost.content = content;
        
         await existingPost.save();

         res.status(200).json({ message: 'Post updated successfully', result: existingPost});

        } catch (error) {
        res.status(500).json({ message: 'Error while updating post',error: error.message})

   }
};
//2. Deleting post
const deletePost = async (req,res) => {
const {id} = req.params;
try {
    const existingPost = await Post.findById(id);

    if (!existingPost) {
        return res.status(404).json({message: 'Post not found'});
    }
    if(req.user._id.toString()!==existingPost.creator.toString()){
        return res.status(403).json({message: 'Unauthorised, you are not the owner'});
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({message: 'Post deleted successfully'});
} catch (error) {
 res.status(500).json({message: 'Error while deleting post', error: error.message}); 
}
};

// 4. Get post by ID
const getPostById = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await Post.findById(id);
        if(!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({message:'Post fetched successfully', result:Post});

    } catch (error) {
      res.status(500).json({message:'Error while fetching Post', error: error.message});  
    }
};

// 5. get all posts by a specific user
const getPostsByUser = async(req, res) =>{
    const{userId} = req.params;

    try {
        const Posts = await Post.find({creator: userId});
        res.status(200).json({message:'Posts fetched successfully', result: Posts})

    } catch (error) {
        res.status(500).json({message: 'Error while fetching posts', error: error.message});
    }
};


module.exports = {CreatePost,getPosts, updatePost, patchPost, deletePost, getPostById, getPostsByUser }; //importing 
