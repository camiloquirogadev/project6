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


function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
        <Route path="dashboard" element={<Dashboard />} />
         <Route path="/test-db" element={<TestDbPage />} />
      {/* Ruta comodín */}
      <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="invoices/:id" element={<InvoiceDetail />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="contacts/:id" element={<ContactDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="settings" element={<Settings />} />
              <Route path="/help" element={<HelpCenter />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;