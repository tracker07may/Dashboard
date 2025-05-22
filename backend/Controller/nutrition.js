const express = require('express');
const Nutrition = require('../Models/nutrition');
const router = express.Router();

// CREATE
const addNutritionData = async (req, res) => {
  const { foodName, calories, protein, carbs, fats, userId } = req.body;

  try {
    const newNutrition = new Nutrition({
      foodName,
      calories,
      protein,
      carbs,
      fats,
      user: userId // 👈 associate with user
    });

    await newNutrition.save();
    res.status(201).json({ message: 'Nutrition data added', data: newNutrition });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add nutrition data', error });
  }
};

// GET ALL (user-specific)
const getAllNutritionData = async (req, res) => {
  const { userId } = req.query;

  try {
    const data = await Nutrition.find({ user: userId }); // 👈 filter by user
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data', error });
  }
};

// GET ONE
const getNutritionById = async (req, res) => {
  try {
    const data = await Nutrition.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};

// UPDATE
const updateNutritionData = async (req, res) => {
  try {
    const updated = await Nutrition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json({ message: 'Updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};

// DELETE
const deleteNutritionData = async (req, res) => {
  try {
    const deleted = await Nutrition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
};

module.exports={addNutritionData,getAllNutritionData,getNutritionById,updateNutritionData,deleteNutritionData}