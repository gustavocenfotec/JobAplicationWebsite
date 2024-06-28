const mongoose = require("mongoose");

const ClientModel = mongoose.model(
  "Client",
  mongoose.Schema(
    {
      nombre_empresa: {
        type: String,
        default: "sin determinar",
      },
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      surname: {
        type: String,
      },
      pass: {
        type: String,
      },
      sujeto: {
        type: String,
        default: "cliente",
      },
      level: {
        type: Number,
        default: "1",
      },
      gender: {
        type: String,
      },
      active: {
        type: Number,
        default: "0",
      },
      inactive: {
        type: Number,
        default: "0",
      },
      f_perfil: {
        type: String,
        default:
          "/ProyectoUniversidad1 v Final/Imagenes/perfil_foto_usuario.png",
      },
      cv: {
        type: String,
        default: "",
      },
      descripcion: {
        type: String,
        default: "",
      },
    },
    { timestamps: true }
  )
);

module.exports = ClientModel;
