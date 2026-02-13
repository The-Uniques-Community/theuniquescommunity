import Trainer from "../../models/admin/trainerModel.js";

// Add a new trainer
export const addTrainer = async (req, res) => {
    try {
        const { fullName, email, contact, origin, designation, trainerBatch, teachingBatch, course, bio, skills, linkedinProfile, githubProfile } = req.body;

        const existingTrainer = await Trainer.findOne({ email });
        if (existingTrainer) {
            return res.status(400).json({ message: "Trainer with this email already exists." });
        }

        const newTrainer = new Trainer({
            fullName,
            email,
            contact,
            origin,
            designation: origin === 'external' ? designation : undefined,
            trainerBatch: origin === 'uniques' ? trainerBatch : undefined,
            teachingBatch,
            batch: teachingBatch, // Determine if we still need this field
            course,
            bio,
            skills,
            linkedinProfile,
            githubProfile,
        });

        await newTrainer.save();
        res.status(201).json({ message: "Trainer added successfully!", trainer: newTrainer });
    } catch (error) {
        console.error("Error adding trainer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all trainers
export const getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find().sort({ createdAt: -1 });
        res.status(200).json(trainers);
    } catch (error) {
        console.error("Error fetching trainers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update a trainer
export const updateTrainer = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTrainer = await Trainer.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTrainer) {
            return res.status(404).json({ message: "Trainer not found." });
        }

        res.status(200).json({ message: "Trainer updated successfully!", trainer: updatedTrainer });
    } catch (error) {
        console.error("Error updating trainer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a trainer
export const deleteTrainer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTrainer = await Trainer.findByIdAndDelete(id);

        if (!deletedTrainer) {
            return res.status(404).json({ message: "Trainer not found." });
        }

        res.status(200).json({ message: "Trainer deleted successfully!" });
    } catch (error) {
        console.error("Error deleting trainer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
