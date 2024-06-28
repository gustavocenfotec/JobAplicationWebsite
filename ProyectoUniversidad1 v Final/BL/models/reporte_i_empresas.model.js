const mongoose = require("mongoose");

const ReporteInvEmpresaModel = mongoose.model(
  "reporteInvitacionesEmpresa",
  mongoose.Schema(
    {
      nombre_empresa: {
        type: String,
      },

      u_invite: {
        type: String,
      },
      position: {
        type: String,
      },
      inv_send: {
        type: String,
        default: "X",
      },
      accepted: {
        type: String,
        default: "",
      },
      denied: {
        type: String,
        default: "",
      },
    },
    { timestamps: true }
  )
);

module.exports = ReporteInvEmpresaModel;
