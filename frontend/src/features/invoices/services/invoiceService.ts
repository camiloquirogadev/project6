import axios from 'axios';

export const api = axios.create({ /* ...config... */ });

import { Invoice } from '../../../types';

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await api.get('/invoices');
  return response.data;
};

export const fetchInvoiceById = async (id: string): Promise<Invoice> => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};

export const createInvoice = async (invoice: Partial<Invoice>) => {
  return await api.post('/invoices', invoice);
};

export const updateInvoice = async (id: string, invoice: Partial<Invoice>) => {
  return await api.put(`/invoices/${id}`, invoice);
};

export const deleteInvoice = async (id: string) => {
  return await api.delete(`/invoices/${id}`);
};
