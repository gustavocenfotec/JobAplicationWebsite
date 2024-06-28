'use strict';
const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const conf = require('dotenv').config();
// const cloudinary = require('cloudinary').v2;


const clientRoutes = require('./routes/client.routes');
const empressRoutes = require('./routes/empress.routes');
const mailerRoutes = require('./routes/mailer.routes');
const reporteIngresoRoutes = require ('./routes/reporte_ingreso_sistema.routes');
const reporteUFinalRoutes = require ('./routes/reporte_U_Final.routes');
const reporteInvtEmpresas=require ('./routes/reporte_i_empresas.routes');
const rPuestosLaboralesRoutes=require ('./routes/r_puestos_laborales.routes');
const FLaboralRoutes=require ('./routes/f_laboral.routes');
const app = express();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTION, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});

const db = mongoose.connect(process.env.MONGO_URI, {}).then((response) => {
    console.log('Connected to the database...');

    app.listen(process.env.PORT, (response) => {
        console.log(`Server listening at http://localhost:${process.env.PORT}`);
        return response;
    });

},(error)=>{console.log("ERROR",error)});

app.use(express.json());
app.use('/clients', clientRoutes);
app.use('/empresses', empressRoutes);
app.use('/email', mailerRoutes);
app.use('/reporteIngresoSistemas', reporteIngresoRoutes);
app.use('/reportFinalUsers', reporteUFinalRoutes);
app.use('/reporteInvitacionesEmpresa', reporteInvtEmpresas);
app.use('/reportePuestosLaborales', rPuestosLaboralesRoutes);
app.use('/puestoslaborales', FLaboralRoutes);