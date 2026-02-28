const mongoose = require("mongoose");
require("dotenv").config();

const Blog = require("./models/Blog");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    await Blog.deleteMany({});

    const demoUser = await User.findOne();

    if (!demoUser) {
      console.log("Pehle ek user register karo");
      process.exit();
    }

    await Blog.insertMany([
      {
        title: "How to Start Blogging in 2026",
        content: "Blogging is one of the best ways to express your ideas and build your personal brand online...",
        author: demoUser._id,
        image: null
      },
      {
        title: "Why Node.js is Powerful",
        content: "Node.js allows you to build scalable backend systems using JavaScript...",
        author: demoUser._id,
        image: null
      },
      {
        title: "Student Guide to Web Development",
        content: "If you are a student and want to start web development, begin with HTML, CSS and JavaScript...",
        author: demoUser._id,
        image: null
      }
    ]);

    console.log("Demo Blogs Inserted");
    process.exit();
  });