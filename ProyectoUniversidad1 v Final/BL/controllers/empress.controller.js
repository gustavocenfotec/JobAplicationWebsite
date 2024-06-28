const EmpressModel = require("../models/empress.model.js");

exports.createOneRequest = async (req, res) => {
  console.log("createOneRequest");
  const foundEmp = await EmpressModel.find(req.body);

  if (foundEmp || !foundEmp.length == 0) {
    const empress = new EmpressModel(req.body);
    const response = await empress.save();
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: "Empress already exists. Try another." });
  }
};

exports.readAllRequest = async (req, res) => {
  console.log("readAllRequest");
  const foundEmp = await EmpressModel.find();

  if (!foundEmp || foundEmp.length == 0) {
    res.status(404).json({ message: "Empress not found!" });
  } else {
    res.status(202).json(foundEmp);
  }
};

exports.readOneRequest = async (req, res) => {
  console.log("readOneRequest");
  const { id } = req.params;

  const empressFound = await EmpressModel.findOne({ _id: id });

  if (!empressFound || empressFound.length == 0) {
    res.status(404).json({ message: "Empress not found!" });
  } else {
    res.status(202).json(empressFound);
  }
};

exports.updateOneRequest = async (req, res) => {
  console.log("updateOneRequest");
  const { id } = req.params;

  const empressFound = await EmpressModel.findOne({ _id: id });

  if (empressFound && empressFound.length !== 0) {
    const response = await empressFound.updateOne(req.body);
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: "Empress not found..." });
  }
};
exports.readOneRequestByEmail = async (req, res) => {
  console.log("readOneRequestByEmail");
  const { email } = req.params;

  const empressFound = await EmpressModel.findOne({ email: email });

  if (empressFound && empressFound.length !== 0) {
    res.status(200).json(empressFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.deleteenterprise = async (req, res) => {
  console.log("deleteOneRequest");
  const { id } = req.params;
  const empressFound = await EmpressModel.findOne({ _id: id });
  console.log(id);
  if (empressFound || empressFound.length == 0) {
    const response = await empressFound.deleteOne({ _id: id });
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: "Empress not found..." });
  }
};

exports.updateprofile = async (req, res) => {
  console.log("updateprofile");
  const { id, updatedData } = req.body;
  console.log("id", id);
  console.log("updatedData", updatedData);
  const empressFound = await EmpressModel.findOne({ _id: id });
  console.log(JSON.stringify(empressFound));
  let updateFields = null;
  updateFields = {
    name: updatedData.name,
    pass: updatedData.pass,
    f_perfil: updatedData.f_perfil,
    descripcion: updatedData.descripcion,
    sitio_web: updatedData.sitio_web,
  };

  if (empressFound) {
    delete empressFound._id;
    const response = await empressFound.updateOne(updateFields);
    console.log("response", response);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};
