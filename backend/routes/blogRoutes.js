const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* CREATE BLOG */
router.post("/", upload.single("image"), async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.filename : null
  });

  await blog.save();
  res.json(blog);
});

/* GET ALL BLOGS */
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

/* DELETE BLOG */
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* LIKE BLOG */
router.put("/:id/like", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.likes += 1;
  await blog.save();
  res.json(blog);
});

/* COMMENT BLOG */
router.post("/:id/comment", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.comments.push({ text: req.body.text });
  await blog.save();
  res.json(blog);
});

module.exports = router;