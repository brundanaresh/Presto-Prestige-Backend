const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
});

blogPostSchema.statics.getAllPosts = async function()  {
  try {
    return this.find();
  } catch (error) {
    throw error;
  }
  };

blogPostSchema.statics.getPostById = async function(id) {
  try {
    return this.findById(id);
  } catch (error) {
    throw error;
  }
};

blogPostSchema.statics.updatePostById = async function(id, data) {
  try {
    return this.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw error;
  }
};

blogPostSchema.statics.deletePostById = async function(id) {
  try {
    return this.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('BlogPost', blogPostSchema);
