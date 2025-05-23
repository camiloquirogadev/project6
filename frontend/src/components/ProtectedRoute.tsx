// src/components/ProtectedRoute.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Invoices from '../pages/Invoices';
import InvoiceDetail from '../pages/InvoiceDetail';
import Contacts from '../pages/Contacts';
import ContactDetail from '../pages/ContactDetail';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import TestDbPage from '../pages/TestDbPage';
import HelpCenter from '../pages/HelpCenter';
import InvoiceForm from '../pages/InvoiceForm';
import InvoiceEdit from '../pages/InvoiceEdit';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function RoleRoute({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: Array<'admin' | 'cliente'>;
}) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Acceso para admin y cliente */}
        <Route
          path="dashboard"
          element={
            <RoleRoute allowedRoles={['admin', 'cliente']}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="invoices"
          element={
            <RoleRoute allowedRoles={['admin', 'cliente']}>
              <Invoices />
            </RoleRoute>
          }
        />
        <Route
          path="invoices/:id"
          element={
            <RoleRoute allowedRoles={['admin', 'cliente']}>
              <InvoiceDetail />
            </RoleRoute>
          }
        />

        {/* Solo admin */}
        <Route
          path="invoices/new"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <InvoiceForm />
            </RoleRoute>
          }
        />
        <Route
          path="invoices/:id/edit"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <InvoiceEdit />
            </RoleRoute>
          }
        />
        <Route
          path="contacts"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <Contacts />
            </RoleRoute>
          }
        />
        <Route
          path="contacts/:id"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <ContactDetail />
            </RoleRoute>
          }
        />
        <Route
          path="products"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <Products />
            </RoleRoute>
          }
        />
        <Route
          path="products/:id"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <ProductDetail />
            </RoleRoute>
          }
        />
        <Route
          path="settings"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <Settings />
            </RoleRoute>
          }
        />
        <Route
          path="test-db"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <TestDbPage />
            </RoleRoute>
          }
        />

        {/* Todos los roles */}
        <Route
          path="help"
          element={
            <RoleRoute allowedRoles={['admin', 'cliente']}>
              <HelpCenter />
            </RoleRoute>
          }
        />

        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Página no encontrada */}
      <Route path="*" element={<NotFound />} />

      {/* Acceso denegado */}
      <Route path="/unauthorized" element={<h1 className="p-8 text-xl text-red-600">Acceso no autorizado</h1>} />
    </Routes>
  );
}

export default AppRoutes;
