const mongoose= require('mongoose');

const FLaboralModel= mongoose.model('puestoslaborales',
    mongoose.Schema(
        {
            responsible: {
                type: String,
            },
            nombre_empresa: {
                type: String,
            },
            puesto_laboral: {
                type: String
            },
            rango_salarial: {
                type: String
            },
            requisitos_minimo: {
                type: String
            },
            atributos_deseables: {
                type: String
            },
        },
        {timestamps: true}
    )

);

module.exports= FLaboralModel;