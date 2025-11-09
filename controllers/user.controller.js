import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User doesn't exist");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    // Prevent password updates through this route
    if (req.body.password) {
      const error = new Error(
        "Password updates are not allowed through this route"
      );
      error.statusCode = 400;
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      const error = new Error("User doesn't exist");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("Unauthorized!");
      error.statusCode = 403;
      throw error;
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id).select(
      "-password"
    );

    if (!deletedUser) {
      const error = new Error("User doesn't exist");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
