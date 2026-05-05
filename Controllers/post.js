const Post = require('../Models/post');

const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()})
   
    try {
        await newPost.save();
        res.status(201).json({message: 'Post created successfully', result: newPost});
} catch (error) {
    res.status(500).json({message: 'Error while creating post', error: error.message});
        }
}

const getPosts = async (req, res) => {
try {
    const posts = await Post.find();
    res.status(200).json({message: 'Posts fetched successfully', result: posts});
} catch (error) {
  res.status(500).json({message: 'Error while fetching posts', error: error.message});  
}
}
module.exports = {
    createPost,
    getPosts
}
