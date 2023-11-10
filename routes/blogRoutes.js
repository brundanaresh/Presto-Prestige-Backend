const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const isAuthenticated = require('../models/isAuthenticated');

//All blog 
router.get('/api/blogpost', async (req, res) => {
  try {
    const allPosts = await BlogPost.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all blog posts' });
  }
});


//specific id

router.get('/api/blogpost/:id', isAuthenticated, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the blog post' });
  }
});



//update
router.put('/api/blogpost/:id',isAuthenticated,  async (req, res) => {
  try {
    const { title, content } = req.body; 
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );

    if (!updatedPost) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the blog post' });
  }
});

// delete
router.delete('/api/blogpost/:id',isAuthenticated,  async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the blog post' });
  }
});


module.exports = router;
