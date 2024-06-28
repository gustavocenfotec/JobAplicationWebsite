const mongoose = require("mongoose");

const EmpressModel = mongoose.model(
  "Empress",
  mongoose.Schema(
    {
      email: {
        type: String,
      },
      pass: {
        type: String,
      },
      name: {
        type: String,
      },
      sujeto: {
        type: String,
        default: "empresa",
      },
      level: {
        type: Number,
        default: "5",
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
      descripcion: {
        type: String,
        default: "",
      },
      sitio_web: {
        type: String,
        default: "n/a",
      },
    },
    { timestamps: true }
  )
);

module.exports = EmpressModel;
