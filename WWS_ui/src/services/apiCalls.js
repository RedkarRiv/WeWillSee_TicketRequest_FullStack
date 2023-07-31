import axios from "axios";

const root = "https://we-will-see-ticket-request-full-stack-ayvl.vercel.app/";

export const loginMe = async (credentials) => {
  return await axios.post(`${root}auth/login`, credentials);
};

export const registerMe = async (newCredentials) => {
  return await axios.post(`${root}auth/register`, newCredentials);
};

export const registNewSAT = async (credentialCheck, newCredentials) => {
  return await axios.post(`${root}admin/newSAT`, newCredentials, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};


export const registNewUser = async (credentialCheck, newCredentials) => {
  return await axios.post(`${root}admin/newUser`, newCredentials, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};

export const newCategory = async (credentialCheck, data) => {
  return await axios.post(`${root}admin/newCategory`, data, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};


export const bringThemes = async (credentialCheck) => {
  return await axios.get(`${root}user/themes`, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};

export const bringThemesByAdmin = async (credentialCheck) => {
  return await axios.get(`${root}admin/themes/all`, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};


export const getOneUser = async (credentialCheck) => {
  return await axios.get(`${root}user/myprofile`, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};

export const ticketMe = async (credentialCheck, newTicketData) => {
  return await axios.post(`${root}user/tickets/new`, newTicketData, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};


export const getAllTicketsByUser = async (credentialCheck, criteria) => {
  if (!criteria) {
    return await axios.get(`${root}user/tickets/all`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  } else {
    return await axios.get(`${root}user/tickets/all?${criteria}`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  }
};

export const getAllTicketsBySAT = async (credentialCheck, criteria) => {
  if (!criteria) {
    return await axios.get(`${root}user/tickets/sat/all`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  } else {
    return await axios.get(`${root}user/tickets/sat/all?${criteria}`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  }
};


export const getAllUsersByAdmin = async (credentialCheck, criteria) => {

  if (!criteria) {
    return await axios.get(`${root}admin/all`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  } else {
    return await axios.get(`${root}admin/all?${criteria}`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  }
};


export const getAllTicketsByAdmin = async (credentialCheck, criteria) => {
  if (!criteria) {
    return await axios.get(`${root}admin/tickets/all`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  } else {
    return await axios.get(`${root}admin/tickets/all?${criteria}`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  }
};

export const inactivateTicket = async (credentialCheck, id) => {
  return await axios.put(
    `${root}user/inactivate/ticket/${id}`,
    {},
    {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    }
  );
};

export const activateTicket = async (credentialCheck, id) => {
  return await axios.put(
    `${root}user/activate/ticket/${id}`,
    {},
    {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    }
  );
};

export const getOneCategory = async (credentialCheck, id) => {
  return await axios.put(
    `${root}user/category/${id}`,
    {},
    {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    }
  );
};

export const closeTicket = async (credentialCheck, id) => {
  return await axios.put(
    `${root}user/close/ticket/${id}`,
    {},
    {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    }
  );
};


export const getAllTicketsStatus = async (credentialCheck) => {
  return await axios.get(`${root}user/tickets/status`, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};


export const newTicketComment = async (credentialCheck, data) => {
  return await axios.post(`${root}user/tickets/new/comment`, data, {
    headers: {
      authorization: "Bearer " + credentialCheck,
    },
  });
};

export const getAllTemplates = async (credentialCheck) => {
    return await axios.get(`${root}user/templates`, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  };


  export const createNewTemplate = async (credentialCheck, data) => {
    return await axios.post(`${root}user/templates/new`, data, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  };


    export const reassignTicket = async (credentialCheck, data) => {
    return await axios.put(`${root}user/tickets/reassign`, data, {
      headers: {
        authorization: "Bearer " + credentialCheck,
      },
    });
  };


  export const getFAQs = async (credentialCheck, id) => {
    return await axios.put(
      `${root}admin/getFAQs/${id}`,
      {},
      {
        headers: {
          authorization: "Bearer " + credentialCheck,
        },
      }
    );
  };
  
  export const inactivateCategory = async (credentialCheck, id) => {
    return await axios.get(`${root}admin/inactivateCat/${id}`, {
      headers: {
        Authorization: "Bearer " + credentialCheck,
      },
    });
  };

  export const activateCategory = async (credentialCheck, id) => {
    return await axios.get(`${root}admin/activateCat/${id}`, {
      headers: {
        Authorization: "Bearer " + credentialCheck,
      },
    });
  };

  
  export const inactivateUser = async (credentialCheck, id) => {
    return await axios.get(
      `${root}admin/inactivateUser/${id}`,
      {
        headers: {
          authorization: "Bearer " + credentialCheck,
        },
      }
    );
  };


  export const activateUser = async (credentialCheck, id) => {
    return await axios.get(
      `${root}admin/activateUser/${id}`,
      {
        headers: {
          authorization: "Bearer " + credentialCheck,
        },
      }
    );
  };