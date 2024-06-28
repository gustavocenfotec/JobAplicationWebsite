const express= require('express');
const urlRoutes= express.Router();

const controller = require('../controllers/reporte_U_Final.controller')


//CRUD

urlRoutes.get ('/', controller.readAllRequest);

urlRoutes.post ('/', controller.createOneRequest);

urlRoutes.get ('/:id', controller.readOneRequest);

urlRoutes.put ('/:id', controller.updateOneRequest);

urlRoutes.get("/email/:email", controller.readOneRequestByEmail);

urlRoutes.delete ('/:id', controller.deleteOneRequest);


module.exports= urlRoutes;