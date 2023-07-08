const { User } = require("../models");
const userController = {};

userController.getOne = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("esto es el userId")
    console.log(req.userId)
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password", "role_id", "password_validation"] },
    });
    return res.status(200).json({
      success: true,
      message: "Datos del usuario recuperados con exito",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "No ha sido posible recuperar los datos del usuario",
      error: error.message,
    });
  }
};


userController.getAll = async (req, res) => {
    try {
      const allUser = await User.findAll({
        attributes: { exclude: ["password"] },
      });
  
      return res.json({
        success: true,
        message: "Datos de todos los usuarios recuperados",
        data: allUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Los datos no han podido ser recuperados",
        error: error.message,
      });
    }
  };

module.exports = userController;
