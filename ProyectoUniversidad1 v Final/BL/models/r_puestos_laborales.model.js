const mongoose= require('mongoose');

const ReportePuestosLaboralesModel= mongoose.model('reportePuestosLaborales',
    mongoose.Schema(
        {
            responsible: {
                type: String
            },
            empresa: {
                type: String
            },
            u_applicant: {
                type: String,
                default: ""
            },
            position: {
                type: String
            },
            ap_recibed: {
                type: String,
                default: ""
            },
            ap_on_check: {
                type: String,
                default: ""
            },
            approved: {
                type: String,
                default: ""
            },
            denied: {
                type: String,
                default: ""
            },
        },
        {timestamps: true}
    )

);

module.exports= ReportePuestosLaboralesModel;