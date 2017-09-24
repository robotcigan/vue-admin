"use strict";

var express = require('express');
var router = express.Router();

let Topic = require('../models/topic');
let Post = require('../models/post');



// router.get('/admin*', function(req, res, next) {
// 	res.render('spa');
// });

// router.post('/admin', function(req, res, next) {
// 	res.send('fgsdf')
// })

router.get('/get-posts', function(req, res, next) {
	Post.getPosts()
		.then(posts => {
			res.send({posts: posts});
		})
		.catch(err => next(err));
});

router.post('/get-post', function(req, res, next) {
	Post.getPostById(req.body.id)
		.then(post => {
			res.send({post: post});
		})
		.catch(err => next(err));
});

router.get('/get-topics', function(req, res, next) {
	Topic.getTopics()
		.then(topics => {
			res.send({topics: topics})
		})
		.catch(err => next(err));
});

router.post('/delete-post', function(req, res, next) {

	Post.deletePost(req.body.id)
		.then( () => {
			res.send('success deleted');
		})
		.catch(err => next(err));

});

router.post('/update-post', function(req, res, next) {

	Post.updatePost(req.body.id, req.body)
		.then( () => {
			res.send('success updated');
		})
		.catch(err => next(err))

});


// router.get('/admin', function(req, res, next) {

// 	Topic.getTopics()
// 		.then(topics => {
// 			Post.getPosts()
// 				.then(posts => {
// 					res.render('admin', {posts: posts, topics: topics});
// 				})
// 				.catch(err => next(err));
// 		})
// 		.catch(err => next(err));

// });

router.post('/save_post', function(req, res, next) {

	let post = req.body;

	Post.createPost(post)
		.then( post => {
				Topic.addPostToTopic(req.body.topic, post._id)
					.then( () => console.log("success") )
					.catch(err => next(err));
				res.send({ post: post });
		})
		.catch(err => next(err));

});

router.get('/delete_post/:id', function(req, res, next) {

	Post.deletePost(req.params.id, function(err) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.redirect('/admin');
		}
	});

});



router.get('/edit_post/:id', function(req, res, next) {

	Post.getPostById(req.params.id, function(err, post) {
		if (err) {
			console.log(err);
			next(err);
		}
		res.render('edit_post', {post: post});
	});

});

router.get('/posts', function(req, res, next) {

	Post.getPosts()
	.then(posts => {
		res.render('posts', {posts: posts});
	})
	.catch(err => next(err));

});

router.get('/post/:id', function(req, res, next) {

	Post.getPostById(req.params.id, function(err, post) {
		if (err) {
			console.log(err);
			next(err);
		}
		res.render('post', {post: post});
	});

});

module.exports = router;
