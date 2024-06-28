const express = require("express");
const urlRoutes = express.Router();

const controller = require("../controllers/empress.controller");

urlRoutes.get("/", controller.readAllRequest);

urlRoutes.post("/", controller.createOneRequest);
urlRoutes.get("/:id", controller.readOneRequest);
urlRoutes.put("/id/:id", controller.updateOneRequest);
urlRoutes.get("/email/:email", controller.readOneRequestByEmail);
urlRoutes.delete("/deleteenterprise/:id", controller.deleteenterprise);
urlRoutes.put("/updateprofile", controller.updateprofile);

module.exports = urlRoutes;
