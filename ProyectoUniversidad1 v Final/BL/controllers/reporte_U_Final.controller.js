const ReporteModel = require("../models/reporte_U_Final.model");
exports.createOneRequest = async (req, res) => {
  console.log("createOneRequest");
  const {
    empresa,
    puesto,
    aplicacion_recibida,
    aplicacion_en_revision,
    aprobada,
    rechazada,
  } = req.body;

  const ReporteFound = await ReporteModel.find({
    empresa,
    puesto,
    aplicacion_recibida,
    aplicacion_en_revision,
    aprobada,
    rechazada,
  });
  console.log("ReporteFound");
  console.log(ReporteFound);

  if (!ReporteFound || ReporteFound.length === 0) {
    console.log("Deberia grabar");
    const reporte = new ReporteModel({
      empresa,
      puesto,
      aplicacion_recibida,
      aplicacion_en_revision,
      aprobada,
      rechazada,
    });
    console.log("Reporte");
    console.log(reporte);
    const response = await reporte.save();
    res.status(201).json(response);
  } else {
    res.status(409).json({ message: "Car alredy exist" });
  }
};

exports.readAllRequest = async (req, res) => {
  console.log("readAllRequest");

  const FoundReporte = await ReporteModel.find();

  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(501).json({ message: "Users not found!" });
  } else {
    res.status(200).json(FoundReporte);
  }
};

exports.readOneRequest = async (req, res) => {
  console.log("readOneRequest");
  const { id } = req.params;

  const FoundReporte = await ReporteModel.find({ _id: id });
  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(200).json({ message: "User not found!" });
  } else {
    res.status(501).json(FoundReporte);
  }
};

exports.updateOneRequest = async (req, res) => {
  console.log("updateOneRequest");
  const { id } = req.params;

  const ReporteFound = await ReporteModel.findOne({ _id: id });
  console.log(JSON.stringify(ReporteFound));

  if (ReporteFound) {
    const response = await ReporteFound.updateOne(req.body);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};

exports.readOneRequestByEmail = async (req, res) => {
  console.log("readOneRequestByEmail");
  const { email } = req.params;

  const ReporteFound = await ReporteModel.findOne({ email: email });

  if (ReporteFound && ReporteFound.length !== 0) {
    res.status(200).json(ReporteFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.deleteOneRequest = async (req, res) => {
  console.log("deleteOneRequest");
  const { id } = req.params;
  const ReporteFound = await ReporteModel.findOne({ _id: id });
  console.log(ReporteFound);
  console.log("Delete");
  if (ReporteFound) {
    const response = await ReporteFound.deleteOne({ _id: id });
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};
