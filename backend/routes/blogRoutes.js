const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// CREATE BLOG
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.filename : null,
      author: req.user.id
    });

    await blog.save();
    res.json(blog);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;