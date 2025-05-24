// backend/models/Role.js
// Example Role object structure:
// {
//   id: string,
//   name: string, // Ej: "Manager", "Editor"
//   permissions: string[], // Ej: ['invoice:read', 'invoice:create']
//   clientId: string // para multicliente
// }

// src/models/Role.js
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: { type: [String], default: [] },
  clientId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
