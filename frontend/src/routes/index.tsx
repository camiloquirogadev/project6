import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Invoices from '../features/invoices/pages/Invoices';
import InvoiceDetail from '../features/invoices/pages/InvoiceDetail';
import InvoiceForm from '../features/invoices/pages/InvoiceForm';
import InvoiceEdit from '../features/invoices/pages/InvoiceEdit';
import Contacts from '../features/contacts/Contacts';
import ContactDetail from '../features/contacts/ContactDetail';
import Products from '../features/products/Products';
import ProductDetail from '../features/products/ProductDetail';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import TestDbPage from '../pages/TestDbPage';
import HelpCenter from '../pages/HelpCenter';
import AdminDashboard from '../pages/AdminDashboard';
import Billing from '../pages/Billing';
import Reports from '../pages/Reports';
import Sales from '../pages/Sales';
import Integrations from '../pages/Integrations';
import CalendarPage from '../features/contacts/CalendarPage';
import UsersPage from '../features/users/pages/UsersPage';
import UserManagement from '../features/users/pages/UserManagement';
import TasksPage from '../pages/TasksPage';
import NotificationsPage from '@/pages/Notifications';
import AccessRoute from '@/components/role/AccessRoute';

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
          <AccessRoute>
            <Layout />
          </AccessRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<AccessRoute><Dashboard /></AccessRoute>} />

        <Route path="admin-dashboard" element={
          <AccessRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </AccessRoute>
        } />

        <Route path="invoices" element={
          <AccessRoute allowedRoles={['admin', 'cliente']}>
            <Invoices />
          </AccessRoute>
        } />
        <Route path="invoices/:id" element={
          <AccessRoute allowedRoles={['admin', 'cliente']}>
            <InvoiceDetail />
          </AccessRoute>
        } />
        <Route path="invoices/new" element={
          <AccessRoute allowedRoles={['admin']}>
            <InvoiceForm />
          </AccessRoute>
        } />
        <Route path="invoices/:id/edit" element={
          <AccessRoute allowedRoles={['admin']}>
            <InvoiceEdit />
          </AccessRoute>
        } />

        <Route path="contacts" element={
          <AccessRoute allowedRoles={['admin']}>
            <Contacts />
          </AccessRoute>
        } />
        <Route path="contacts/:id" element={
          <AccessRoute allowedRoles={['admin']}>
            <ContactDetail />
          </AccessRoute>
        } />

        <Route path="products" element={
          <AccessRoute allowedRoles={['admin']}>
            <Products />
          </AccessRoute>
        } />
        <Route path="products/:id" element={
          <AccessRoute allowedRoles={['admin']}>
            <ProductDetail />
          </AccessRoute>
        } />

        <Route path="settings" element={
          <AccessRoute allowedRoles={['admin']}>
            <Settings />
          </AccessRoute>
        } />
        <Route path="test-db" element={
          <AccessRoute allowedRoles={['admin']}>
            <TestDbPage />
          </AccessRoute>
        } />
        <Route path="help" element={
          <AccessRoute>
            <HelpCenter />
          </AccessRoute>
        } />
        <Route path="billing" element={
          <AccessRoute allowedRoles={['admin']}>
            <Billing />
          </AccessRoute>
        } />
        <Route path="reports" element={
          <AccessRoute allowedRoles={['admin']}>
            <Reports />
          </AccessRoute>
        } />
        <Route path="sales" element={
          <AccessRoute allowedRoles={['admin']}>
            <Sales />
          </AccessRoute>
        } />
        <Route path="integrations" element={
          <AccessRoute allowedRoles={['admin']}>
            <Integrations />
          </AccessRoute>
        } />
        <Route path="calendar" element={<AccessRoute><CalendarPage /></AccessRoute>} />
        <Route path="users" element={
          <AccessRoute allowedRoles={['admin']}>
            <UsersPage />
          </AccessRoute>
        } />
        <Route path="users/:id" element={
          <AccessRoute allowedRoles={['admin']}>
            <UsersPage />
          </AccessRoute>
        } />
        <Route path="user-management" element={
          <AccessRoute allowedRoles={['admin']}>
            <UserManagement />
          </AccessRoute>
        } />
        <Route path="tasks" element={
          <AccessRoute allowedRoles={['admin']}>
            <TasksPage />
          </AccessRoute>
        } />
        <Route path="notifications" element={
          <AccessRoute>
            <NotificationsPage />
          </AccessRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route path="/unauthorized" element={<h1 className="p-8 text-xl text-red-600">Acceso no autorizado</h1>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
