import FarmersPost from "../models/farmersPost.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
      console.log("Incoming data:", req.body, "User:", req.user);
    const { imageUrl, name, totalQuantity, price, offeredQuantity, available } = req.body;

    const newPost = new FarmersPost({
      farmerId: req.user.id, // comes from protect middleware
      imageUrl,
      name,
      totalQuantity,
      price,
      offeredQuantity,
      available,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
     console.error("Error in createPost:", err);
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
};

// Get all posts of the logged-in farmer
export const getPosts = async (req, res) => {
  try {
    const posts = await FarmersPost.find({ farmerId: req.user.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await FarmersPost.findOne({ _id: id, farmerId: req.user.id });
    if (!post) return res.status(404).json({ message: "Post not found" });

    Object.assign(post, req.body); // update fields
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await FarmersPost.findOneAndDelete({ _id: id, farmerId: req.user.id });
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
};
