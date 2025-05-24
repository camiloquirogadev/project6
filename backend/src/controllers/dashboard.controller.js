// backend/src/controllers/dashboard.controller.js
exports.getDashboardMetrics = async (req, res) => {
  const clientId = req.user?.clientId;

  // Mock de ejemplo; reemplazar por lógica real con la base de datos
  const data = {
    totalUsers: 25,
    totalInvoices: 130,
    totalRevenue: 84200.75,
    unpaidInvoices: 17,
  };

  return res.json(data);
};
