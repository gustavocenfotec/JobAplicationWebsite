const express = require("express");
const urlRoutes = express.Router();

const controller = require("../controllers/reporte_i_empresas.controller");

//CRUD

urlRoutes.get("/", controller.readAllRequest);

urlRoutes.post("/", controller.createOneRequest);

urlRoutes.get("/:id", controller.readOneRequest);

urlRoutes.put("/id/:id", controller.updateOneRequest);

urlRoutes.get("/email/:email", controller.readOneRequestByEmail);

urlRoutes.get(
  "/nombre_empresa/:nombre_empresa",
  controller.readAllRequestByNombre_empresa
);

urlRoutes.delete("/:id", controller.deleteOneRequest);

urlRoutes.put("/updatereport", controller.updateApplication);

module.exports = urlRoutes;
