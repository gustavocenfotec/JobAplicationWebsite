const express = require("express");
const urlRoutes = express.Router();

const controller = require("../controllers/mailer.controller");

urlRoutes.post("/", controller.sendMail);



module.exports = urlRoutes;