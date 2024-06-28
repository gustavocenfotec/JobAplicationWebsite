const ReporteInvEmpresaModel = require("../models/reporte_i_empresas.model");
exports.createOneRequest = async (req, res) => {
  console.log("createOneRequest");
  const { nombre_empresa, u_invite, position } = req.body;

  const ReporteFound = await ReporteInvEmpresaModel.find({
    nombre_empresa,
    u_invite,
    position,
  });
  console.log("ReporteFound");
  console.log(ReporteFound);

  if (!ReporteFound || ReporteFound.length === 0) {
    console.log("Deberia grabar");
    const reporte = new ReporteInvEmpresaModel({
      nombre_empresa,
      u_invite,
      position,
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
  const FoundReporte = await ReporteInvEmpresaModel.find();
  console.log("PIDO TODO");

  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(501).json({ message: "Users not found!" });
  } else {
    res.status(200).json(FoundReporte);
  }
};

exports.readOneRequest = async (req, res) => {
  console.log("readOneRequest");
  const { id } = req.params;

  const FoundReporte = await ReporteInvEmpresaModel.find({ _id: id });
  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(200).json({ message: "User not found!" });
  } else {
    res.status(501).json(FoundReporte);
  }
};

exports.updateOneRequest = async (req, res) => {
  console.log("updateOneRequest");
  const { id } = req.params;

  const FoundReporte = await ReporteInvEmpresaModel.findOne({ _id: id });
  console.log(JSON.stringify(FoundReporte));

  if (FoundReporte) {
    const response = await FoundReporte.updateOne(req.body);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};

exports.readOneRequestByEmail = async (req, res) => {
  console.log("readOneRequestByEmail");
  const { email } = req.params;

  const FoundReporte = await ReporteInvEmpresaModel.findOne({ email: email });

  if (FoundReporte && FoundReporte.length !== 0) {
    res.status(200).json(FoundReporte);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.readAllRequestByNombre_empresa = async (req, res) => {
  console.log("readAllRequestByNombre_empresa");
  const { nombre_empresa } = req.params;

  const ReporteFound = await ReporteInvEmpresaModel.find({
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
  const ReporteFound = await ReporteInvEmpresaModel.findOne({ _id: id });
  console.log(ReporteFound);
  console.log("Delete");
  if (ReporteFound) {
    const response = await ReporteFound.deleteOne({ _id: id });
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};

exports.updateApplication = async (req, res) => {
  console.log("updateApplication");
  const { id, newStatus } = req.body;
  console.log("newStatus");
  console.log(id);
  console.log("id");
  console.log(id);
  const ReporteFound = await ReporteInvEmpresaModel.findOne({ _id: id });
  console.log(JSON.stringify(ReporteFound));
  let updateFields = null;
  switch (newStatus) {
    case "send":
      updateFields = {
        inv_send: "X",
        accepted: "",
        denied: "",
      };

      break;
    case "accepted":
      updateFields = {
        inv_send: "",
        accepted: "X",
        denied: "",
      };
      break;
    case "rejected":
      updateFields = {
        inv_send: "",
        accepted: "",
        denied: "X",
      };
      break;
  }

  if (ReporteFound) {
    delete ReporteFound._id;
    const response = await ReporteFound.updateOne(updateFields);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};
