const ReporteIngresoModel = require("../models/reporte_ingreso_sistema.model");
exports.createOneRequest = async (req, res) => {
  console.log("createOneRequest");

  const { nombre_empresa, usuario, ingreso, salida, dia } = req.body;

  const ReporteFound = await ReporteIngresoModel.find({
    nombre_empresa,
    usuario,
    ingreso,
    salida,
    dia,
  });
  console.log("ReporteFound");
  console.log(ReporteFound);

  if (!ReporteFound || ReporteFound.length === 0) {
    console.log("Deberia grabar");
    const reporte = new ReporteIngresoModel({
      nombre_empresa,
      usuario,
      ingreso,
      salida,
      dia,
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

  const FoundReporte = await ReporteIngresoModel.find();

  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(501).json({ message: "Users not found!" });
  } else {
    res.status(200).json(FoundReporte);
  }
};

exports.readOneRequest = async (req, res) => {
  console.log("readOneRequest");
  const { id } = req.params;

  const FoundReporte = await ReporteIngresoModel.find({ _id: id });
  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(200).json({ message: "User not found!" });
  } else {
    res.status(501).json(FoundReporte);
  }
};

exports.updateOneRequest = async (req, res) => {
  console.log("updateOneRequest");
  const { id } = req.params;

  const ReporteFound = await ReporteIngresoModel.findOne({ _id: id });
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

  const ReporteFound = await ReporteIngresoModel.findOne({ email: email });

  if (ReporteFound && ReporteFound.length !== 0) {
    res.status(200).json(ReporteFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.readAllRequestByNombre_empresa = async (req, res) => {
  console.log("readAllRequestByNombre_empresa");

  const { nombre_empresa } = req.params;

  const ReporteFound = await ReporteIngresoModel.find({
    nombre_empresa: nombre_empresa,
  });

  if (ReporteFound && ReporteFound.length !== 0) {
    res.status(200).json(ReporteFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.deleteOneRequest = async (req, res) => {
  console.log("deleteOneRequest");
  const { id } = req.params;
  const ReporteFound = await ReporteIngresoModel.findOne({ _id: id });
  console.log(ReporteFound);
  console.log("Delete");
  if (ReporteFound) {
    const response = await ReporteFound.deleteOne({ _id: id });
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};

exports.searchBarUsuario = async (req, res) => {
  console.log("searchBarUsuario");
  const { usuario } = req.params;

  const ReporteFound = await ReporteIngresoModel.find({ usuario: usuario });

  if (ReporteFound && ReporteFound.length !== 0) {
    res.status(200).json(ReporteFound);
  } else {
    res.status(501).json({ message: "Report not found..." });
  }
};
