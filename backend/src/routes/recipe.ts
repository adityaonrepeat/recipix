import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import Recipe from "../models/Recipe";

const router = express.Router();

// ✅ Public route - get all recipes
router.get("/", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.json(recipes);
});

// ✅ Protected route - get user’s own recipes
router.get("/mine", verifyToken, async (req: any, res) => {
  const recipes = await Recipe.find({ author: req.user.email }).sort({ createdAt: -1 });
  res.json(recipes);
});

// ✅ Protected route - create new recipe
router.post("/", verifyToken, async (req: any, res) => {
  try {
    const { title, description, image } = req.body;
    const newRecipe = new Recipe({
      title,
      description,
      image,
      author: req.user.email,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error saving recipe", error: err });
  }
});

export default router;
