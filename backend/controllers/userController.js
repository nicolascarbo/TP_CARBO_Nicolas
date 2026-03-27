import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  // Ajout de next ici
  try {
    const { role, page = 1, limit = 10, search } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (role) filter.role = role;
    if (search) filter.name = { $regex: new RegExp(search, "i") };

    const [users, totalCount] = await Promise.all([
      userModel.find(filter).skip(skip).limit(limitNum),
      userModel.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      page: pageNum,
      limit: limitNum,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
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
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Les champs name et email sont obligatoires",
      });
    }

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

    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    const { _id, createdAt, ...allowedUpdates } = req.body;

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

    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    const deletedUser = await userModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
