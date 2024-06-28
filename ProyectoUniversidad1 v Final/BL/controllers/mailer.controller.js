//CONTROLADOR DE ENVIO DE CORREO
"use strict";
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  // service:"gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
    }

});


// ,
//   tls: {
//     rejectUnauthorized: false
//     }


exports.sendMail = async (req, res) => {
    const { to, subject, message } = req.body;

  
    if (to && subject && message) {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
          });
          console.log("Revisar la informacion dada");
          console.log(info);

      res.status(200).json(info.reponse); //TO DO REVISAR STATUS
    } else {
      res.status(404).json({ message: "Empty parameters" });
    }
  };