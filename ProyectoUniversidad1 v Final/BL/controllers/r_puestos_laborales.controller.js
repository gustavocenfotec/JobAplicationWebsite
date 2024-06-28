const ReportePuestosLaboralesModel = require("../models/r_puestos_laborales.model");
exports.createOneRequest = async (req, res) => {
  console.log("createOneRequest");
  const {
    responsible,
    empresa,
    u_applicant,
    position,
    ap_recibed,
    ap_on_check,
    approved,
    denied,
  } = req.body;

  const ReporteFound = await ReportePuestosLaboralesModel.find({
    responsible,
    empresa,
    u_applicant,
    position,
    ap_recibed,
    ap_on_check,
    approved,
    denied,
  });
  console.log("ReporteFound");
  console.log(ReporteFound);

  if (!ReporteFound || ReporteFound.length === 0) {
    console.log("Deberia grabar");
    const reporte = new ReportePuestosLaboralesModel({
      responsible,
      empresa,
      u_applicant,
      position,
      ap_recibed,
      ap_on_check,
      approved,
      denied,
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
  const FoundReporte = await ReportePuestosLaboralesModel.find();

  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(501).json({ message: "Users not found!" });
  } else {
    res.status(200).json(FoundReporte);
  }
};

exports.readOneRequest = async (req, res) => {
  console.log("readOneRequest");
  const { id } = req.params;

  const FoundReporte = await ReportePuestosLaboralesModel.find({ _id: id });
  if (!FoundReporte || FoundReporte.length == 0) {
    res.status(200).json({ message: "User not found!" });
  } else {
    res.status(501).json(FoundReporte);
  }
};

exports.updateOneRequest = async (req, res) => {
  console.log("updateOneRequest");
  const { id } = req.params;

  console.log("id");

  const ReporteFound = await ReportePuestosLaboralesModel.findOne({ _id: id });
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

  const ReporteFound = await ReportePuestosLaboralesModel.findOne({
    email: email,
  });

  if (ReporteFound && ReporteFound.length !== 0) {
    res.status(200).json(ReporteFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.readAllRequestByUseraplicant = async (req, res) => {
  console.log("readAllRequestByUseraplicant");
  const { u_applicant } = req.params;

  const ReporteFound = await ReportePuestosLaboralesModel.find({
    u_applicant: u_applicant,
  });

  if (ReporteFound && ReporteFound.length !== 0) {
    res.status(200).json(ReporteFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.readAllRequestByEmpresa = async (req, res) => {
  console.log("readAllRequestByEmpresa");
  const { empresa } = req.params;

  const ReporteFound = await ReportePuestosLaboralesModel.find({
    empresa: empresa,
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
  const ReporteFound = await ReportePuestosLaboralesModel.findOne({ _id: id });
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
  const ReporteFound = await ReportePuestosLaboralesModel.findOne({ _id: id });
  console.log(JSON.stringify(ReporteFound));
  let updateFields = null;
  switch (newStatus) {
    case "received":
      updateFields = {
        ap_recibed: "X",
        ap_on_check: "",
        approved: "",
        denied: "",
      };

      break;
    case "revision":
      updateFields = {
        ap_recibed: "",
        ap_on_check: "X",
        approved: "",
        denied: "",
      };
      break;
    case "approved":
      updateFields = {
        ap_recibed: "",
        ap_on_check: "",
        approved: "X",
        denied: "",
      };
      break;
    case "rejected":
      updateFields = {
        ap_recibed: "",
        ap_on_check: "",
        approved: "",
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

exports.searchBarPosition = async (req, res) => {
  console.log("searchBarPosition");
  const { position } = req.params;

  const ReporteFound = await ReportePuestosLaboralesModel.find({
    position: position,
  });

  if (ReporteFound && ReporteFound.length !== 0) {
    res.status(200).json(ReporteFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};
