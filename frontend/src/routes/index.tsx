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
import RoleRoute from '../components/role/RoleRoute';
import Billing from '../pages/Billing';
import Reports from '../pages/Reports';
import Sales from '../pages/Sales';
import Integrations from '../pages/Integrations';
import CalendarPage from '../features/contacts/CalendarPage';
import UsersPage from '../features/users/pages/UsersPage';
import UserManagement from '../features/users/pages/UserManagement';
import TasksPage from '../pages/TasksPage';



function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      } >
        <Route path="/admin-dashboard" element={<RoleRoute allowedRoles={['admin']}><AdminDashboard /></RoleRoute>} />

        <Route path="integrations" element={
          <RoleRoute allowedRoles={['admin']}>
            <Integrations />
          </RoleRoute>
        }
        />

        <Route path="/users" element={<RoleRoute allowedRoles={['admin']}><UsersPage /></RoleRoute>} />
        <Route path="/users/:id" element={<RoleRoute allowedRoles={['admin']}><UsersPage /></RoleRoute>} />

        <Route path="/user-management" element={<RoleRoute allowedRoles={['admin']}><UserManagement /></RoleRoute>} />

        <Route path="calendar" element={<CalendarPage />} />

        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="admin" element={<RoleRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleRoute>
        } />
        <Route path="/tasks" element={
          <RoleRoute allowedRoles={['admin']}>
            <TasksPage />
          </RoleRoute>
        } />


        <Route path="sales" element={<Sales />} />
        <Route
          path="/reports"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <Reports />
            </RoleRoute>
          }
        />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="invoices/new" element={<InvoiceForm />} />
        <Route path="invoices/:id" element={<InvoiceDetail />} />
        <Route path="invoices/:id/edit" element={<InvoiceEdit />} />
        <Route path="invoices/:id/preview" element={<InvoiceDetail />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="contacts/:id" element={<ContactDetail />} />

        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />

        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<HelpCenter />} />
        <Route path="test-db" element={<TestDbPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
