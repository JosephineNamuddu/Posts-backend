const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    creator: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
const PostModel = mongoose.model('post',postSchema);
module.exports = PostModel;