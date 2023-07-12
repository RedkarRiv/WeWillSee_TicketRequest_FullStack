const { User, Role, SAT } = require("../models");
const userController = {};
const bcrypt = require("bcrypt");
const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{4,}$/;
const { Op } = require("sequelize");

userController.getOne = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("esto es el userId");
    console.log(req.userId);
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


userController.updateUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.json({
        success: true,
        message: "El usuario no existe",
      });
    }

    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const updateData = {};
    if (newName) {
      updateData.name = newName;
    }
    if (newEmail) {
      if (!checkEmail.test(newEmail)) {
        return res.status(400).json({
          success: false,
          message: "El correo no es valido",
        });
      }
      updateData.email = newEmail;
    }
    if (newPassword) {
      if (!regex.test(req.body.password)) {
        return res.json({
          success: true,
          message:
            "La contraseña debe tener una mayuscula, una minuscula y un número. Su longitud nunca puede ser inferior a 4.",
        });
      }
      const newCryptPassword = bcrypt.hashSync(newPassword, 10);
      updateData.password = newCryptPassword;
    }

    const result = await User.update(
      updateData,

      {
        where: {
          id: userId,
        },
      }
    );

    return res.json({
      success: true,
      message: "Datos del usuario actualizados",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No se ha podido actualizar los datos del usuario",
      error: error.message,
    });
  }
};

userController.deleteOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.destroy({
      where: {
        id: userId,
      },
      cascade: true,
    });
    return res.json({
      success: true,
      message: "El usuario ha sido eliminado",
      data: deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El usuario no ha podido ser eliminado",
      error: error.message,
    });
  }
};

userController.inactivateOne = async (req, res) => {
  try {
    const userId = req.userId;
    const userCheck = await User.findByPk(userId);

    if (!userCheck) {
      return res.json({
        success: true,
        message: "El usuario no existe",
      });
    }
    const inactivateUser = await User.update(
      { user_status: "Inactive" },
      {
        where: {
          id: userId,
        },
      }
    );
    return res.json({
      success: true,
      message: "El usuario ha sido desactivado",
      data: inactivateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El usuario no ha podido ser desactivado",
      error: error.message,
    });
  }
};

userController.activateOne = async (req, res) => {
  try {
    const userId = req.userId;
    const userCheck = await User.findByPk(userId);

    if (!userCheck) {
      return res.json({
        success: true,
        message: "El usuario no existe",
      });
    }
    const inactivateUser = await User.update(
      { user_status: "Activate" },
      {
        where: {
          id: userId,
        },
      }
    );
    return res.json({
      success: true,
      message: "El usuario ha sido activado",
      data: inactivateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El usuario no ha podido ser activado",
      error: error.message,
    });
  }
};

module.exports = userController;
