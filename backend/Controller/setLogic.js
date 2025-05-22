const SetCounter = require("../Models/Setuser");

exports.addSetCounter = async (req, res) => {
  const { workoutName, totalSets, completedSets, notes } = req.body;

  if (!workoutName || totalSets == null || completedSets == null) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    const newSetCounter = new SetCounter({
      workoutName,
      totalSets,
      completedSets,
      notes,
    });

    await newSetCounter.save();
    res.status(201).json({ message: "SetCounter added successfully", data: newSetCounter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
