const express = require('express');

const { CreatePost, getPosts, updatePost, patchPost,deletePost } = require('../Controllers/post');

const auth = require('../Middlewares/auth');

const router = require('express').Router();



router.post('/', auth, CreatePost);

router.get('/',getPosts);

router.put('/:id', auth, updatePost)

router.patch('/:id', auth, patchPost)

router.delete('/:id', auth, deletePost)


module.exports = router;



