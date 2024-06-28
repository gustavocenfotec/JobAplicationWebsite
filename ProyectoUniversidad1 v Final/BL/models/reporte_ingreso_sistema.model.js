const mongoose= require('mongoose');

const ReporteIngresoModel= mongoose.model('reporteIngresoSistemas',
    mongoose.Schema(
        {
            nombre_empresa:{
                type: String
            },
            usuario: {
                type: String
            },
            ingreso: {
                type: String
            },
            salida: {
                type: String
            },
            dia: {
                type: String
            },
        },
        {timestamps: true}
    )

);

module.exports= ReporteIngresoModel;