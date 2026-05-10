const express = require('express');

const { CreatePost, getPosts, updatePost, patchPost,deletePost, getPostById, getPostsByUser } = require('../Controllers/post');

const auth = require('../Middlewares/auth');

const router = require('express').Router();



router.post('/', auth, CreatePost);

router.get('/',getPosts);

router.get('/user/:userId', getPostsByUser)

router.get('/:id', getPostById)

router.put('/:id', auth, updatePost)

router.patch('/:id', auth, patchPost)

router.delete('/:id', auth, deletePost)






module.exports = router;



