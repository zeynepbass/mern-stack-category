const express = require("express");
const router = express.Router();
const Category=require("../models/Categories.js");
router.get("/", async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });
router.post("/",async(req,res)=>{
    try {
        const {name}=req.body;
        const newCategory = new Category({name});
          await newCategory.save();
        res.status(201).json(newCategory)
    } catch (error) {
        console.log(error)
    }
})
router.get("/:categoryId", async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
  
      try {
        const category = await Category.findById(categoryId);
  
        res.status(200).json(category);
      } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Category not found." });
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });
  router.put("/:categoryId", async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const updates = req.body;
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        return res.status(404).json({ error: "Category not found." });
      }
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        updates,
        { new: true }
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });
  router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
  
module.exports = router;