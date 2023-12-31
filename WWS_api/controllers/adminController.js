const {
  User,
  Role,
  SAT,
  Ticket,
  Theme,
  FAQ,
  Category,
  Message,
  TicketStatus,
  sequelize,
} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const adminController = {};

adminController.userRegister = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{4,}$/;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Tienes que rellenar todos los campos",
      });
    }

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
      data: {
        newUserDATA: newUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No ha sido posible crear la cuenta",
      error: error.message,
    });
  }
};

adminController.SATregister = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{4,}$/;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Tienes que rellenar todos los campos",
      });
    }

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
      sat_status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
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
    return res.status(500).json({
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

adminController.inactivateOneByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

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
      message: "El usuerio ha sido desactivado por el admin",
      data: inactivateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El usuario no ha podido ser desactivado por el admin",
      error: error.message,
    });
  }
};

adminController.activateOneByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    const activateUser = await User.update(
      { user_status: "Active" },
      {
        where: {
          id: userId,
        },
      }
    );
    return res.json({
      success: true,
      message: "El usaurio ha sido activado por el admin",
      data: activateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El usuario no ha podido ser activado por el admin",
      error: error.message,
    });
  }
};

adminController.getAllUsers = async (req, res) => {
  try {
    const filters = {};
    const query = req.query;

    if (Object.keys(query).length > 0) {
      if (query.name) {
        filters.name = {
          [Op.like]: `%${query.name}%`,
        };
      }

      if (query.email) {
        filters.email = {
          [Op.like]: `%${query.email}%`,
        };
      }
      if (query.role_id) {
        filters.role_id = {
          [Op.like]: `%${query.role_id}%`,
        };
      }
      if (query.user_status) {
        filters.user_status = {
          [Op.like]: `%${query.user_status}%`,
        };
      }
      const filteredUsers = await User.findAll({
        where: {
          ...filters,
        },
        include: [
          {
            attributes: { exclude: ["id"] },
            model: Role,
          },
        ],
      });
      if (filteredUsers.length === 0) {
        return res.json({
          success: true,
          message: "No existen usuarios con estos filtros",
        });
      }

      return res.json({
        success: true,
        message: "Datos de usuarios filtrados recuperados",
        data: filteredUsers,
      });
    } else {
      const allUsers = await User.findAll({
        attributes: { exclude: ["password"] },

        include: [
          {
            attributes: { exclude: ["id"] },
            model: Role,
          },
        ],
      });

      return res.json({
        success: true,
        message: "Datos de todos los usuarios recuperados",
        data: allUsers,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Los datos no han podido ser recuperados",
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

adminController.getAllTickets = async (req, res) => {
  try {
    const filters = {};
    const query = req.query;

    if (Object.keys(query).length > 0) {
      if (query.SAT_assigned) {
        filters.SAT_assigned = {
          [Op.like]: `%${query.SAT_assigned}%`,
        };
      }

      if (query.ticket_status) {
        filters.ticket_status = {
          [Op.like]: `%${query.ticket_status}%`,
        };
      }
      if (query.ticket_title) {
        filters.ticket_title = {
          [Op.like]: `%${query.ticket_title}%`,
        };
      }
      if (query.createdAt) {
        const startDate = moment(query.createdAt)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(query.createdAt)
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss");

        filters.createdAt = {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        };
      }

      const allTickets = await Ticket.findAll({
        attributes: { exclude: ["password"] },
        where: {
          ...filters,
        },

        include: [
          {
            model: User,
          },

          {
            model: SAT,
            include: [
              {
                model: User,
              },
            ],
          },
          {
            model: Category,
            include: [
              {
                model: Theme,
              },
              {
                model: FAQ,
              },
            ],
          },
          {
            model: Message,
            include: [
              {
                model: User,
                include: [
                  {
                    model: Role,
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.json({
        success: true,
        message: "Todos los tickets recuperados",
        data: allTickets,
      });
    } else {
      const allTickets = await Ticket.findAll({
        include: [
          {
            model: User,
          },
          {
            model: TicketStatus,
          },
          {
            model: SAT,
            include: [
              {
                model: User,
              },
            ],
          },
          {
            model: Category,
            include: [
              {
                model: Theme,
              },
              {
                model: FAQ,
              },
            ],
          },
          {
            model: Message,
            include: [
              {
                model: User,
                include: [
                  {
                    model: Role,
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.json({
        success: true,
        message: "Todos los tickets recuperados",
        data: allTickets,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Los datos no han podido ser recuperados",
      error: error.message,
    });
  }
};

adminController.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [
        {
          model: Theme,
        },

        {
          model: FAQ,
        },
      ],
    });

    return res.json({
      success: true,
      message: "Todas las categorias recuperados",
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Los datos no han podido ser recuperados",
      error: error.message,
    });
  }
};

adminController.newTheme = async (req, res) => {
  try {
    const themeName = req.body.new_theme_name;

    const checkTheme = await Theme.findAll({
      where: {
        theme_name: themeName,
      },
    });

    if (checkTheme.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Ya existe un tema con ese nombre",
      });
    }

    const newTheme = await Theme.create({
      theme_name: themeName,
      theme_status: "Active",
    });

    return res.status(200).json({
      success: true,
      message: "El tema se ha creado con exito",
      data: {
        newThemeDATA: newTheme,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "No ha sido posible crear el tema",
      error: error.message,
    });
  }
};

adminController.getAllThemes = async (req, res) => {
  try {
    const allThemes = await Theme.findAll({
      include: [
        {
          model: Category,
          include: [
            {
              model: FAQ,
            },
          ],
        },
      ],
    });

    return res.json({
      success: true,
      message: "Todas los temas recuperados",
      data: allThemes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Los datos no han podido ser recuperados",
      error: error.message,
    });
  }
};

adminController.newCategory = async (req, res) => {
  try {
    const newCategoryName = req.body.new_category_name;
    const newCategoryTheme = req.body.theme;

    const checkCategory = await Category.findAll({
      where: {
        category_name: newCategoryName,
      },
    });

    if (checkCategory.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Ya existe una categoria con ese nombre",
      });
    }

    const newCategory = await Category.create({
      category_name: newCategoryName,
      theme_id: newCategoryTheme,

      category_status: "Active",
    });

    return res.status(200).json({
      success: true,
      message: "La categoria ha sido creada con exito",
      data: {
        newThemeDATA: newCategory,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "No ha sido posible crear el tema",
      error: error.message,
    });
  }
};

adminController.newFAQ = async (req, res) => {
  try {
    const newFAQCategory = req.body.category_id;
    const newFAQquestion = req.body.question;
    const newFASanswer = req.body.answer;

    const checkFAQ = await FAQ.findAll({
      where: {
        question: newFAQquestion,
      },
    });

    if (checkFAQ.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Ya existe un FAQ con esa consulta",
      });
    }

    const newFAQ = await FAQ.create({
      category_id: newFAQCategory,
      question: newFAQquestion,
      answer: newFASanswer,
      FAQ_status: "Active",
    });

    return res.status(200).json({
      success: true,
      message: "El FAQ ha sido creada con exito",
      data: {
        newFAQDATA: newFAQ,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "No ha sido posible crear el FAQ",
      error: error.message,
    });
  }
};

adminController.getAllFAQs = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const oneFAQ = await FAQ.findByPk({
      where: {
        category_id: categoryId,
      },
    });

    return res.json({
      success: true,
      message: "Todas los temas recuperados",
      data: oneFAQ,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Los datos no han podido ser recuperados",
      error: error.message,
    });
  }
};

adminController.inactivateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const inactivateCategory = await Category.update(
      { category_status: "Inactive" },
      {
        where: {
          id: categoryId,
        },
      }
    );
    return res.json({
      success: true,
      message: "La categoria ha sido desactivada por el admin",
      data: inactivateCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "La categoria  no ha podido ser desactivada por el admin",
      error: error.message,
    });
  }
};
adminController.activateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const inactivateCategory = await Category.update(
      { category_status: "Active" },
      {
        where: {
          id: categoryId,
        },
      }
    );
    return res.json({
      success: true,
      message: "La categoria ha sido desactivada por el admin",
      data: inactivateCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "La categoria  no ha podido ser desactivada por el admin",
      error: error.message,
    });
  }
};

// adminController.getAllRoles = async (req, res) => {
//   try {
//     const allRoles = await Role.findAll({});

//     return res.json({
//       success: true,
//       message: "Todas los roles recuperados",
//       data: allRoles,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Los roles no han podido ser recuperados",
//       error: error.message,
//     });
//   }
// };

module.exports = adminController;
