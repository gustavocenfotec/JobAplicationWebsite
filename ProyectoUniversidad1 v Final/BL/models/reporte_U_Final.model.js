const mongoose= require('mongoose');

const Reporte_U_Final_Model= mongoose.model('reportFinalUsers',
    mongoose.Schema(
        {
            empresa: {
                type: String
            },
            puesto: {
                type: String
            },
            aplicacion_recibida: {
                type: String,
                default:"X"
            },
            aplicacion_en_revision: {
                type: String,
                default:""
            },
            aprobada: {
                type: String,
                default:""
            },
            rechazada: {
                type: String,
                default:""
            },
        },
        {timestamps: true}
    )

);

module.exports= Reporte_U_Final_Model;