export const CheckError = (name, value, password) => {
  switch (name) {
    case "email":
    case "e-mail":
    case "correo":
      if ((value === "")) {
        return "";
      }
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return "El formato de e-mail es incorrecto";
      }
      return "";

    case "password":
    case "contraseña":
      if ((value === "")) {
        return "";
      }
      if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{4,}$/.test(value)) {
        return "El password no tiene el formato correcto.";
      } 
      return "";
    case "doubleCheckPassword":
        if ((value === "")) {
            return "";
      }
      if (value !== password) {
        return "Las dos contraseñas tienen que ser iguales.";
      }
      return "";

    case "name":
        if ((value === "")) {
            return "";
      }
      if (!/^([A-Z][a-z]{2,}(?: [A-Z][a-z]{2,})*)$/.test(value)) {
        return "El formato de nombre no es valido";
      }
      return "";

    default:
      console.log("Unknown format");
      return "";
  }
};
  