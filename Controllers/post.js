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
}

//fetch/read posts
const getPosts = async (req, res) => {
try {
    const posts = await Post.find();
    res.status(200).json({message: 'Posts fetched successfully', result: posts});
} catch (error) {
  res.status(500).json({message: 'Error while fetching posts', error: error.message});  
}
}
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
    }
//Patch method of updating APIs
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
}
//Deleting post
const deletePost = async (req,res) => {
const Post = await Post.findById(req.params.id);
if(Post.creator.toString()!== req.user._id.toString()){
    return res.status(403).json({message:'Not authorized'});
}

    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Post deleted successfully'});
    } catch (error) {
       res.status(500).json({message:error.message}); 
    }
}




module.exports = {CreatePost,getPosts, updatePost, patchPost, deletePost }; //importing 
