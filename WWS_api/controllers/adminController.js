const { User, Role, SAT } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminController = {};

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
