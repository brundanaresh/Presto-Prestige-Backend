const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost'); // Adjust the path according to your project's structure

mongoose.connect('mongodb://localhost:27017/brunda', {
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

    const blogPosts = [
      {
        title: 'Enter the Realm of Wonder: The Magic Unveiled',
        content: 'Have you ever felt the thrill of wonder that washes over you when you witness a magician perform an incredible feat? The feeling of awe, the suspension of disbelief, and the sheer magic of the moment—these are the elements that make magic an art form like no other.',
        image: '/BlogImg0.jpeg',
      },
      {
        title: 'The Artistry Behind Card Tricks',
        content: 'At the heart of every card trick lies a deep understanding of the mechanics of a deck of cards.',
        image: '/BlogImg1.jpeg',
      },
      {
        title: 'The History of Magic: From Ancient Wonders to Modern Illusions',
        content: ' Magic roots can be traced to the ancient civilizations of Egypt, Mesopotamia, and China. In these early societies, magicians and priests held great influence, using their knowledge of illusion and deception to awe and inspire the masses. They performed feats like turning water into wine, making objects levitate, and predicting the future.',
        image: '/BlogImg2.jpeg',
      },
      {
        title: 'Masters of Escape: The World of Houdini and Escape Artists',
        content: 'Content for Masters of Escape...',
        image: '/BlogImg3.jpeg',
      },
      {
        title: 'Mind Reading and Mentalism: Unlocking the Secrets of the Mind',
        content: 'Content for Mind Reading and Mentalism...',
        image: '/BlogImg4.jpeg',
      },
      {
        title: 'Magic in Pop Culture: How Magic Shaped Our Entertainment',
        content: 'Content for Magic in Pop Culture...',
        image: '/BlogImg5.jpeg',
      },
    ];

    const saveOrUpdateBlogPost = async (blogPostData) => {
      try {
        const filter = { title: blogPostData.title};
        const update = { $set: blogPostData};

        await BlogPost.updateOne(filter, update, {upsert: true });
      } catch (error) {
        console.error('Error saving or updating blog post:', error);
      }
    };
       
    blogPosts.forEach(async (post) => {
      await saveOrUpdateBlogPost(post);
      {
        console.log(`Saved/Updated Blog Post title: ${post.title} ${post.content}`);
   
    }
});

db.close
});
