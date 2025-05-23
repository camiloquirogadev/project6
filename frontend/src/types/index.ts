export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;       // ISO string o 'YYYY-MM-DD'
  dueDate: string;    // ISO string o 'YYYY-MM-DD'
  contactId: string;
  items: InvoiceItem[];
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  total: number;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'vendor';
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  period: string;
}