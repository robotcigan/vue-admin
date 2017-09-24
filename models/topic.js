"use strict";

var mongoose = require("mongoose");

// Post Schema
var topicSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	handle: {
		type: String,
		unique: true
	},
	posts:   { type: Array }
});

var Topic = module.exports = mongoose.model('Topic', topicSchema);
module.exports = mongoose.model('Topic', topicSchema);

// get Topics
module.exports.getTopics = function() {
	return Topic.find();
}

// add post id to Topic
module.exports.addPostToTopic = function(topic, postId) {
	return Topic.update( {title: topic}, { $push: {posts: postId}} );
}