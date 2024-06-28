const express = require("express");
const urlRoutes = express.Router();

const controller = require("../controllers/f_laboral.controller");

//CRUD

urlRoutes.get("/", controller.readAllRequest);

urlRoutes.post("/", controller.createOneRequest);

urlRoutes.get("/:id ", controller.readOneRequest);

urlRoutes.get("/:id", controller.readOneRequest);

urlRoutes.get("/email/:email", controller.readOneRequestByEmail);

urlRoutes.get(
  "/nombre_empresa/:nombre_empresa",
  controller.readAllRequestByNombre_empresa
);

urlRoutes.delete("/:id", controller.deleteOneRequest);

urlRoutes.put("/updateposition", controller.updateApplication);

module.exports = urlRoutes;
