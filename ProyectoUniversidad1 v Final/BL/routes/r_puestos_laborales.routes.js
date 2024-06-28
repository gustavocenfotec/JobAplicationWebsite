const express = require("express");
const urlRoutes = express.Router();

const controller = require("../controllers/r_puestos_laborales.controller");

//CRUD

urlRoutes.get("/", controller.readAllRequest);

urlRoutes.post("/", controller.createOneRequest);

urlRoutes.get("/:id", controller.readOneRequest);

// urlRoutes.put("/:id", controller.updateOneRequest);

urlRoutes.put("/updatereport", controller.updateApplication);

urlRoutes.get("/email/:email", controller.readOneRequestByEmail);

urlRoutes.get(
  "/u_applicant/:u_applicant",
  controller.readAllRequestByUseraplicant
);

urlRoutes.get("/empresa/:empresa", controller.readAllRequestByEmpresa);

urlRoutes.delete("/:id", controller.deleteOneRequest);

urlRoutes.get("/searchbar/searchbar/:position", controller.searchBarPosition);

module.exports = urlRoutes;
