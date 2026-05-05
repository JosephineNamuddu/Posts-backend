const express = require('express');

const { CreatePost, getPosts } = require('../Controllers/post');

const auth = require('../Middlewares/auth');

const router = express.Router();

router.post('/', auth, CreatePost);
router.get('/',getPosts);



module.exports = router;



