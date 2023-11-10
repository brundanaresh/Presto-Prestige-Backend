const express = require('express');
const router = express.Router();
const BlogPost = require('../../models/BlogPost');


// Get all blog posts
router.get('/api/blogpost', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Create a new blog post
router.post('/api/blogpost', async (req, res) => {

  try {
    const { title, content } = req.body;
    const newPost = new BlogPost({ title, content });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a blog post' });
  }
});

// Update a blog post by ID
router.put('/blogpost/:d', async (req, res) => {
 
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id, { title, content }, 
      { new: true });

 if (updatedPost) {
      return res.json({ message: 'Blog post updated successfully', updatedPost });
    } else {
      return res.status(404).json({ error: 'Blog post not found' });
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete a blog post by ID
router.delete('/api/blogpost/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await BlogPost.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the blog post' });
  }
});


// Get a specific blog post by ID
router.get('/api/blogpost/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the blog post' });
  }
});

module.exports = router;
