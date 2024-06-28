const express = require("express");
const urlRoutes = express.Router();

const controller = require("../controllers/client.controller");

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

urlRoutes.put("/manageEnterprise", controller.manageEnterprise);

urlRoutes.put("/updateprofile", controller.updateprofile);

urlRoutes.get("/searchbar/searchbar/:email", controller.searchbarEmail);

module.exports = urlRoutes;
