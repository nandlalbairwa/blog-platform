const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Get all blogs (admin view)
router.get("/blogs", auth, admin, async (req, res)=>{
  const blogs = await Blog.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.json(blogs);
});

// Delete any blog
router.delete("/blogs/:id", auth, admin, async (req, res)=>{
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted by admin" });
});

module.exports = router;

router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    res.json(user);

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});