const FLaboralModel = require("../models/f_laboral.model");
exports.createOneRequest = async (req, res) => {
  console.log("createOneRequest");
  const {
    responsible,
    nombre_empresa,
    puesto_laboral,
    rango_salarial,
    requisitos_minimo,
    atributos_deseables,
  } = req.body;

  const FLaboralFound = await FLaboralModel.find({
    responsible,
    nombre_empresa,
    puesto_laboral,
    rango_salarial,
    requisitos_minimo,
    atributos_deseables,
  });
  console.log("FLaboralFound");
  console.log(FLaboralFound);

  if (!FLaboralFound || FLaboralFound.length === 0) {
    console.log("Deberia grabar");
    const reporte = new FLaboralModel({
      responsible,
      nombre_empresa,
      puesto_laboral,
      rango_salarial,
      requisitos_minimo,
      atributos_deseables,
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
  const FoundReporte = await FLaboralModel.find();

  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(501).json({ message: "Users not found!" });
  } else {
    res.status(200).json(FoundReporte);
  }
};

exports.readAllRequestByNombre_empresa = async (req, res) => {
  console.log("readAllRequestByNombre_empresa");
  const { nombre_empresa } = req.params;

  const FoundReporte = await FLaboralModel.find({
    nombre_empresa: nombre_empresa,
  });

  if (FoundReporte && FoundReporte.length !== 0) {
    res.status(200).json(FoundReporte);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.readOneRequest = async (req, res) => {
  console.log("readOneRequest");
  const { id } = req.params;

  const FoundReporte = await FLaboralModel.findOne({ _id: id });

  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(501).json({ message: "Prod not found!" });
  } else {
    console.log(FoundReporte);
    res.status(200).json(FoundReporte);
  }
};

exports.updateOneRequest = async (req, res) => {
  console.log("updateOneRequest");
  const { _id } = req.params;

  const FLaboralFound = await FLaboralModel.findOne({ _id: _id });
  console.log(JSON.stringify(FLaboralFound));

  if (FLaboralFound) {
    const response = await FLaboralFound.updateOne(req.body);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};

exports.readOneRequestByEmail = async (req, res) => {
  console.log("readOneRequestByEmail");
  const { email } = req.params;

  const FLaboralFound = await FLaboralModel.findOne({ email: email });

  if (FLaboralFound && FLaboralFound.length !== 0) {
    res.status(200).json(FLaboralFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.deleteOneRequest = async (req, res) => {
  console.log("deleteOneRequest");
  const { id } = req.params;
  const FLaboralFound = await FLaboralModel.findOne({ _id: id });
  console.log(FLaboralFound);
  console.log("Delete");
  if (FLaboralFound) {
    const response = await FLaboralFound.deleteOne({ _id: id });
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};

exports.updateApplication = async (req, res) => {
  console.log("updateApplication");
  const { id, postData } = req.body;
  console.log("postData", postData);
  console.log("id", id);
  console.log("postData", postData);
  const ReporteFound = await FLaboralModel.findOne({ _id: id });
  console.log(JSON.stringify(ReporteFound));
  let updateFields = null;
  updateFields = {
    puesto_laboral: postData.puesto_laboral,
    rango_salarial: postData.rango_salarial,
    requisitos_minimo: postData.requisitos_minimo,
    atributos_deseables: postData.atributos_deseables,
  };

  if (ReporteFound) {
    delete ReporteFound._id;
    const response = await ReporteFound.updateOne(updateFields);
    console.log("response", response);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};
