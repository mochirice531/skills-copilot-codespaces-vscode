// Create web server
var express = require('express');
var router = express.Router();

// Import model
var Comment = require('../models/comment');

// Create comment
router.post('/create', (req, res) => {
    var comment = new Comment({
        content: req.body.content,
        user: req.body.user,
        post: req.body.post
    });

    comment.save((err, comment) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating comment',
                error: err
            });
        }
        return res.status(201).json(comment);
    });
});

// Get all comments
router.get('/', (req, res) => {
    Comment.find((err, comments) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting comments',
                error: err
            });
        }
        return res.json(comments);
    });
});

// Get single comment
router.get('/:id', (req, res) => {
    var id = req.params.id;
    Comment.findOne({_id: id}, (err, comment) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting comment',
                error: err
            });
        }
        if (!comment) {
            return res.status(404).json({
                message: 'No such comment'
            });
        }
        return res.json(comment);
    });
});

// Update comment
router.put('/:id', (req, res) => {
    var id = req.params.id;
    Comment.findOne({_id: id}, (err, comment) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting comment',
                error: err
            });
        }
        if (!comment) {
            return res.status(404).json({
                message: 'No such comment'
            });
        }

        comment.content = req.body.content ? req.body.content : comment.content;
        comment.user = req.body.user ? req.body.user : comment.user;
        comment.post = req.body.post ? req.body.post : comment.post;

        comment.save((err, comment) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating comment',
                    error: err
                });
            }
            return res.json(comment);
        });
    });git add comments.js
});