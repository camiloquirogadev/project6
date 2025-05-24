// src/controllers/roleController.js
const Role = require('../models/Role');

exports.getRoles = async (req, res) => {
  const roles = await Role.find({ clientId: req.user.clientId });
  res.json(roles);
};

exports.createRole = async (req, res) => {
  const { name, permissions } = req.body;
  const newRole = new Role({ name, permissions, clientId: req.user.clientId });
  await newRole.save();
  res.status(201).json(newRole);
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  const updated = await Role.findByIdAndUpdate(id, { name, permissions }, { new: true });
  res.json(updated);
};

exports.deleteRole = async (req, res) => {
  await Role.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
