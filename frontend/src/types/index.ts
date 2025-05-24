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
export interface Sale {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status?: 'pending' | 'completed' | 'cancelled';
}

export type Contact = {
  id: string;
  name: string;
  email: string;
  role?: string; // <-- Agrega esta línea
  // ...otros campos si es necesario
};

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