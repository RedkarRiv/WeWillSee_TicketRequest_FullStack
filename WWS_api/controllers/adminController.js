const { User, Role, SAT } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminController = {};

adminController.SATregister = async (req, res) => {
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
      role_id: 2,
      user_status: "Active",
    });
    const newSAT = await SAT.create({
      user_id: newUser.id,
    });

    const role = await Role.findByPk(newUser.role_id);
    await newUser.setRole(role);

    return res.status(200).json({
      success: true,
      message: "La cuenta se ha creado con exito",
      data: {
        newUserDATA: newUser,
        newSATDATA: newSAT,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "No ha sido posible crear la cuenta",
      error: error.message,
    });
  }
};

adminController.SATdelete = async (req, res) => {
  try {
    const SATId = req.params.id;
    const deleteSAT = await SAT.destroy({
      where: {
        id: SATId,
      },
    });
    return res.json({
      success: true,
      message: "El SAT ha sido eliminado",
      data: deleteSAT,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El SAT no ha podido ser eliminado",
      error: error.message,
    });
  }
};

adminController.inactivateOneSAT = async (req, res) => {
  try {
    const SATId = req.params.id;

    const inactivateSAT = await SAT.update(
      { sat_status: "Inactive" },
      {
        where: {
          id: SATId,
        },
      }
    );
    return res.json({
      success: true,
      message: "El SAT ha sido desactivado",
      data: inactivateSAT,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El SAT no ha podido ser desactivado",
      error: error.message,
    });
  }
};

adminController.activateOneSAT = async (req, res) => {
    try {
      const SATId = req.params.id;
  
      const inactivateSAT = await SAT.update(
        { sat_status: "Active" },
        {
          where: {
            id: SATId,
          },
        }
      );
      return res.json({
        success: true,
        message: "El SAT ha sido activado",
        data: inactivateSAT,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "El SAT no ha podido ser activado",
        error: error.message,
      });
    }
  };

adminController.getAllSAT = async (req, res) => {
  try {
    const allSATs = await SAT.findAll({
      include: [
        {
          attributes: { exclude: ["password"] },
          model: User,
        },
      ],
    });
    return res.json({
      success: true,
      message: "Datos de SATs recuperados",
      data: allSATs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Los datos no han podido ser recuperados",
      error: error.message,
    });
  }
};

module.exports = adminController;