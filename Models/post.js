const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    tittle: { type: String, required: true },
    content: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})
const PostModel = mongoose.model('post',postSchema);
module.exports = PostModel