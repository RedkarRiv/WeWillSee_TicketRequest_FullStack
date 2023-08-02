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
  Template,
  sequelize,
} = require("../models");
const userController = {};
const bcrypt = require("bcrypt");
const moment = require("moment/moment");
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

userController.getAllThemesByUser = async (req, res) => {
  try {
    const allThemes = await Theme.findAll({
      include: [
        {
          model: Category,
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

userController.newTicketByUser = async (req, res) => {
  try {
    const ticketCounts = await Ticket.findAll({
      attributes: ["SAT_assigned", [sequelize.fn("COUNT", "id"), "count"]],
      group: "SAT_assigned",
      order: sequelize.literal("count ASC"),
      limit: 1,
    });

    const ticketTitle = req.body.title;
    const ticketDescription = req.body.description;
    const requesterId = req.userId;
    const categoryId = req.body.categoryId;
    const ticketTimeline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    console.log("esto es el ticketCounts");
    console.log(ticketCounts);

    if (!ticketTitle || ticketTitle == "") {
      return res.json({
        success: true,
        message: "No puedes crear un ticket sin título",
      });
    }

    if (!ticketDescription || ticketDescription == "") {
      return res.json({
        success: true,
        message: "No puedes crear un ticket sin descripción",
      });
    }


    const newTicket = await Ticket.create({
      ticket_title: ticketTitle,
      ticket_description: ticketDescription,
      requester: requesterId,
      SAT_assigned: ticketCounts[0]?.SAT_assigned,
      ticket_category_id: categoryId,
      ticket_status: 1,
      ticket_timeline: ticketTimeline,
      reassigned: false,
      createdAt: new Date(),
      updatedUp: new Date(),
    });
    return res.json({
      success: true,
      message: "Ticket creado con existo",
      data: newTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El ticket no ha podido ser creado",
      error: error.message,
    });
  }
};

userController.getAllTicketsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const filters = {};
    const query = req.query;

    if (Object.keys(query).length > 0) 
    {
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

      const filteredTickets = await Ticket.findAll({
        attributes: { exclude: ["password"] },
        where: {
          requester: userId,
          ...filters,
        },
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
      if (filteredTickets.length === 0) {
        return res.json({
          success: true,
          message: "No existen tickets con estos filtros",
        });
      }

      return res.json({
        success: true,
        message: "Datos de tickets filtrados recuperados",
        data: filteredTickets,
      });
    } else {
      const allTickets = await Ticket.findAll({
        where: {
          requester: userId,
        },
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

userController.getAllTicketsBySAT = async (req, res) => {
  try {
    const userId = req.userId;
    const filters = {};
    const query = req.query;
    const employeeData = await SAT.findAll({
      where: {
        user_id: userId,
      },
    });

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
        where: {
          SAT_assigned: employeeData[0].id,
          ...filters,
        },
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

    const allTickets = await Ticket.findAll({
      where: {
        SAT_assigned: employeeData[0].id,
      },
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Los datos no han podido ser recuperados",
      error: error.message,
    });
  }
};

userController.inactivateTicket = async (req, res) => {
  try {
    const userId = req.userId;
    const ticketId = req.params.id;
    const ticketCheck = await Ticket.findAll({
      where: {
        id: ticketId,
        requester: userId,
      },
    });

    if (!ticketCheck) {
      return res.json({
        success: true,
        message: "El ticket no existe",
      });
    }
    const inactivateTicket = await Ticket.update(
      { ticket_status: 3 },
      {
        where: {
          id: ticketId,
        },
      }
    );
    return res.json({
      success: true,
      message: "El ticket ha sido anulado",
      data: inactivateTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El ticket no ha podido ser anulado",
      error: error.message,
    });
  }
};

userController.activateTicket = async (req, res) => {
  try {
    const userId = req.userId;
    const ticketId = req.params.id;
    const ticketCheck = await Ticket.findAll({
      where: {
        id: ticketId,
        requester: userId,
      },
    });

    if (!ticketCheck) {
      return res.json({
        success: true,
        message: "El ticket no existe",
      });
    }
    const inactivateTicket = await Ticket.update(
      { ticket_status: 1 },
      {
        where: {
          id: ticketId,
        },
      }
    );
    return res.json({
      success: true,
      message: "El ticket ha sido activado",
      data: inactivateTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El ticket no ha podido ser activado",
      error: error.message,
    });
  }
};

userController.closeTicket = async (req, res) => {
  try {
    const userId = req.userId;
    const ticketId = req.params.id;
    const ticketCheck = await Ticket.findAll({
      where: {
        id: ticketId,
        requester: userId,
      },
    });

    if (!ticketCheck) {
      return res.json({
        success: true,
        message: "El ticket no existe",
      });
    }
    const inactivateTicket = await Ticket.update(
      { ticket_status: 2 },
      {
        where: {
          id: ticketId,
        },
      }
    );
    return res.json({
      success: true,
      message: "El ticket ha sido cerrado",
      data: inactivateTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El ticket no ha podido ser cerrado",
      error: error.message,
    });
  }
};

userController.getTicketStatus = async (req, res) => {
  try {
    const ticketStatusData = await TicketStatus.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.json({
      success: true,
      message: "Los estados de los tickets han sido recuperados",
      data: ticketStatusData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No se han podido importar los estados de los tickets",
      error: error.message,
    });
  }
};

userController.newComment = async (req, res) => {
  try {
    const userId = req.userId;
    const ticketId = req.body.ticket;
    const newMessage = req.body.message;

    const newComment = await Message.create({
      ticket_id: ticketId,
      comment_user_id: userId,
      message_content: newMessage,
      createdAt: new Date(),
      updatedUp: new Date(),
    });
    return res.json({
      success: true,
      message: "Comentario creado con existo",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El Comentario no ha podido ser creado",
      error: error.message,
    });
  }
};

userController.getAllTemplates = async (req, res) => {
  try {
    const userId = req.userId;
    const employeeData = await SAT.findAll({
      where: {
        user_id: userId,
      },
    });
    const allTemplates = await Template.findAll({
      where: {
        SAT_id: employeeData[0].id,
      },
    });

    return res.json({
      success: true,
      message: "Todas los templates recuperados",
      data: allTemplates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Los templates no han podido ser recuperados",
      error: error.message,
    });
  }
};

userController.newTemplate = async (req, res) => {
  try {
    const userId = req.userId;
    const newTitleTemplate = req.body.template_title;
    const newDescriptionTemplate = req.body.template_description;
    const employeeData = await SAT.findAll({
      where: {
        user_id: userId,
      },
    });
    const newComment = await Template.create({
      SAT_id: employeeData[0].id,
      template_title: newTitleTemplate,
      template_description: newDescriptionTemplate,
      createdAt: new Date(),
      updatedUp: new Date(),
    });
    return res.json({
      success: true,
      message: "Template creado con existo",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El template no ha podido ser creado",
      error: error.message,
    });
  }
};

userController.reassignTicketBySAT = async (req, res) => {
  try {
    const userId = req.userId;

    const employeeData = await SAT.findAll({
      where: {
        user_id: userId,
      },
    });

    if (!employeeData[0].id) {
      return res.json({
        success: false,
        message: "No tienes permiso para continuar",
      });
    }
    const excludedSAT = employeeData[0].id;

    const ticketCounts = await Ticket.findAll({
      attributes: ["SAT_assigned", [sequelize.fn("COUNT", "id"), "count"]],
      where: {
        SAT_assigned: {
          [Op.ne]: excludedSAT,
        },
      },
      group: "SAT_assigned",
      order: sequelize.literal("count ASC"),
      limit: 1,
    });

    const ticketId = req.body.id;
    const ticketTimeline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const updateTicket = await Ticket.update(
      {
        SAT_assigned: ticketCounts[0]?.SAT_assigned,
        ticket_status: 1,
        ticket_timeline: ticketTimeline,
        reassigned: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        where: {
          id: ticketId,
        },
      }
    );
    return res.json({
      success: true,
      message: "Ticket reasignado con exito",
      data: updateTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "El ticket no ha podido ser reasignado",
      error: error.message,
    });
  }
};


userController.getOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const allCategories = await Category.findAll({
      include: [
        {
          model: FAQ,
        },
      ],
      where : {
        id:categoryId
      }
    });

    return res.json({
      success: true,
      message: "Categoria recuperada",
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
module.exports = userController;
