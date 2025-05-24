import { createContext, useContext, useState, useEffect } from 'react';
import {
  mockInvoices,
  mockContacts,
  mockProducts,
  mockDashboardMetrics
} from '../services/mockData';
import { Invoice, Contact, Product, DashboardMetric } from '../types';

// ✅ Agregá sales al tipo
export type DataContextType = {
  invoices: Invoice[];
  contacts: Contact[];
  products: Product[];
  dashboardMetrics: DashboardMetric[];
  sales: Sale[];

  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  updateInvoice: (invoice: Invoice) => void;
  removeInvoice: (id: string) => void;

  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;

  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
};

export const DataContext = createContext<DataContextType>({
  invoices: [],
  contacts: [],
  products: [],
  dashboardMetrics: [],
  sales: [],

  addInvoice: () => {},
  updateInvoice: () => {},
  removeInvoice: () => {},

  addContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},

  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetric[]>([]);
  const [sales, setSales] = useState<Sale[]>([]); // ✅ nuevo estado

  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices');
    const storedContacts = localStorage.getItem('contacts');
    const storedProducts = localStorage.getItem('products');
    const storedSales = localStorage.getItem('sales');

    setInvoices(storedInvoices ? JSON.parse(storedInvoices) : mockInvoices);
    setContacts(storedContacts ? JSON.parse(storedContacts) : mockContacts);
    setProducts(storedProducts ? JSON.parse(storedProducts) : mockProducts);
    setSales(storedSales ? JSON.parse(storedSales) : []); // opcional, fallback to empty array if no mockSales
    setDashboardMetrics(mockDashboardMetrics);
  }, []);

  useEffect(() => {
    if (sales.length > 0) {
      localStorage.setItem('sales', JSON.stringify(sales));
    }
  }, [sales]);

  useEffect(() => {
    if (invoices.length > 0) {
      localStorage.setItem('invoices', JSON.stringify(invoices));
    }
  }, [invoices]);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const newInvoice = { ...invoice, id: crypto.randomUUID() };
    setInvoices(prev => [...prev, newInvoice]);
  };

  const updateInvoice = (invoice: Invoice) => {
    setInvoices(prev =>
      prev.map(item => (item.id === invoice.id ? { ...item, ...invoice } : item))
    );
  };

  const removeInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: crypto.randomUUID() };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (id: string, contact: Partial<Contact>) => {
    setContacts(prev =>
      prev.map(item => (item.id === id ? { ...item, ...contact } : item))
    );
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(item => item.id !== id));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: crypto.randomUUID() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts(prev =>
      prev.map(item => (item.id === id ? { ...item, ...product } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        invoices,
        contacts,
        products,
        dashboardMetrics,
        sales,
        addInvoice,
        updateInvoice,
        removeInvoice,
        addContact,
        updateContact,
        deleteContact,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
