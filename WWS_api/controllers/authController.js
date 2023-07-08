const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {};

authController.register = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{4,}$/;

    console.log();

    if (!checkEmail.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        message: "El correo no tiene un formato valido",
      });
    }

    if (!regex.test(password)) {
      return res.json({
        success: true,
        message:
          "La contraseña debe tener una mayuscula, una minuscula y un número. Su longitud nunca puede ser inferior a 4.",
      });
    }

    const newPassword = bcrypt.hashSync(password, 8);
    const newUser = await User.create({
      name: name,
      email: email,
      password: newPassword,
      password_validation: true,
      role_id: 1,
      user_status: "Active",
    });
    return res.status(200).json({
        success: true,
        message: "La cuenta se ha creado con exito",
        data: newUser,
      });

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "No ha sido posible crear la cuenta",
      error: error.message,
    });
  }
};

authController.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(501).json({
        success: true,
        message: "Usuario incorrecto",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(501).json({
        success: true,
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        roleId: user.role_id,
        email: user.email,
        name: user.name
      },
      "resolutio",
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Usuario logeado correctamente",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El usuario no ha podido logearse",
      error: error.menssage,
    });
  }
};

module.exports = authController;
