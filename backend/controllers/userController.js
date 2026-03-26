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

export const createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Les champs name et email sont obligatoires",
    });
  }

  if (userModel.findByEmail(email)) {
    return res.status(409).json({
      success: false,
      message: "Cet email est déjà utilisé",
    });
  }

  const newUser = userModel.create({ name, email, role });

  res.status(201).json({
    success: true,
    data: newUser,
  });
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  const { id: bodyId, createdAt, ...allowedUpdates } = req.body;

  if (allowedUpdates.email && userModel.findByEmail(allowedUpdates.email, id)) {
    return res.status(409).json({
      success: false,
      message: "Cet email est déjà utilisé",
    });
  }

  const updatedUser = userModel.update(id, allowedUpdates);

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
