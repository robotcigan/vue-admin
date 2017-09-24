"use strict";

var mongoose = require("mongoose");

// Post Schema
var postSchema = mongoose.Schema({
	title:   { type: String, required: true },
	topic:   { type: String },
	previewContent: { type: String, required: true },
	content: { type: String, required: true },
	createdDate: {
		type: Date,
		default: Date.now
	}
});

var Post = module.exports = mongoose.model('Post', postSchema);
module.exports = mongoose.model('Post', postSchema);

// get Posts
module.exports.getPosts = function(limit) {
	return Post.find().limit(limit);
}

// get Post
module.exports.getPostById = function(id) {
	return Post.findById(id);
	console.log('fdsgs')
}

// create Post
module.exports.createPost = function(post) {
	return Post.create(post);
}

// delete Post
module.exports.deletePost = function(id) {
	return Post.findByIdAndRemove(id);
}

// update Post
module.exports.updatePost = function(id, post) {
	console.log(id, post)
	return Post.findByIdAndUpdate(id, post);
}