import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const { role } = req.query;
  const filter = role ? { role } : {};
  const users = await userModel.find(filter);

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

export const getUserById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de l'utilisateur",
    });
  }
};

export const createUser = async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Les champs name et email sont obligatoires",
    });
  }

  try {
    const newUser = await userModel.create({ name, email, role });

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Cet email est déjà utilisé",
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de l'utilisateur",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "ID invalide",
    });
  }

  const { _id, createdAt, ...allowedUpdates } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, allowedUpdates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Cet email est déjà utilisé",
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de l'utilisateur",
    });
  }
};

export const deleteUser = (req, res) => {
  const success = userModel.remove(req.params.id);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé",
    });
  }

  res.status(204).send();
};
