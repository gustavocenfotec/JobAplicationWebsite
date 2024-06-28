const ClientModel = require("../models/client.model.js");

exports.createOneRequest = async (req, res) => {
  console.log("createOneRequest");
  const foundClit = await ClientModel.find(req.body);

  if (!foundClit || foundClit.length == 0) {
    const client = new ClientModel(req.body);
    const response = await client.save();
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: "Client already exists. Try another." });
  }
};

exports.readAllRequest = async (req, res) => {
  console.log("readAllRequest");
  const foundClit = await ClientModel.find();

  if (!foundClit || foundClit.length == 0) {
    res.status(404).json({ message: "Client not found!" });
  } else {
    res.status(202).json(foundClit);
  }
};

exports.readOneRequest = async (req, res) => {
  console.log("readOneRequest");
  const { id } = req.params;

  const clientFound = await ClientModel.findOne({ _id: id });

  if (!clientFound || clientFound.length == 0) {
    res.status(200).json({ message: "Client not found!" });
  } else {
    res.status(200).json(clientFound);
  }
};

exports.readOneRequestByEmail = async (req, res) => {
  console.log("readOneRequestByEmail");
  const { email } = req.params;

  const clientFound = await ClientModel.findOne({ email: email });

  if (clientFound && clientFound.length !== 0) {
    res.status(200).json(clientFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.readAllRequestByNombre_empresa = async (req, res) => {
  console.log("readAllRequestByNombre_empresa");
  const { nombre_empresa } = req.params;

  const clientFound = await ClientModel.find({
    nombre_empresa: nombre_empresa,
  });

  if (clientFound && clientFound.length !== 0) {
    res.status(200).json(clientFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.updateOneRequest = async (req, res) => {
  console.log("updateOneRequest");
  const { id } = req.params;

  const clientFound = await ClientModel.findOne({ _id: id });

  if (clientFound && clientFound.length !== 0) {
    const response = await clientFound.updateOne(req.body);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.deleteOneRequest = async (req, res) => {
  console.log("deleteOneRequest");
  const { id } = req.params;
  const clientFound = await ClientModel.findOne({ _id: id });
  if (clientFound || clientFound.length == 0) {
    const response = await clientFound.deleteOne({ _id: id });
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};

exports.manageEnterprise = async (req, res) => {
  console.log("manageEnterprise");
  console.log("updateApplication");
  const { id, level } = req.body;
  console.log("level", level);
  console.log("id", id);
  console.log("level", level);
  const clientFound = await ClientModel.findOne({ _id: id });
  console.log(JSON.stringify(clientFound));
  let updateFields = null;
  updateFields = {
    level: level,
  };

  if (clientFound) {
    delete clientFound._id;
    const response = await clientFound.updateOne(updateFields);
    console.log("response", response);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};

exports.updateprofile = async (req, res) => {
  console.log("updateprofile");
  console.log("updateprofile");
  const { id, updatedData } = req.body;
  console.log("id", id);
  console.log("updatedData", updatedData);
  const clientFound = await ClientModel.findOne({ _id: id });
  console.log(JSON.stringify(clientFound));
  let updateFields = null;
  updateFields = {
    name: updatedData.name,
    surname: updatedData.surname,
    pass: updatedData.pass,
    f_perfil: updatedData.f_perfil,
    descripcion: updatedData.descripcion,
  };

  if (clientFound) {
    delete clientFound._id;
    const response = await clientFound.updateOne(updateFields);
    console.log("response", response);
    res.status(200).json(response);
  } else {
    res.status(501).json({ message: "User not found..." });
  }
};

exports.searchbarEmail = async (req, res) => {
  console.log("searchbarEmail");
  const { email } = req.params;

  const clientFound = await ClientModel.find({ email: email });

  if (clientFound && clientFound.length !== 0) {
    res.status(200).json(clientFound);
  } else {
    res.status(501).json({ message: "Client not found..." });
  }
};
