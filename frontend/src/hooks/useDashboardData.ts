// src/hooks/useDashboardData.ts
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

interface Metric {
  id: string;
  label: string;
  value: number;
  change?: string;
  period?: string;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  status: string;
  total: number;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  type: 'customer' | 'supplier';
}

export function useDashboardData() {
  const [dashboardMetrics, setMetrics] = useState<Metric[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, invoicesRes, contactsRes] = await Promise.all([
          api.get('/dashboard/metrics'),
          api.get('/invoices'),
          api.get('/contacts'),
        ]);

        setMetrics(metricsRes.data);
        setInvoices(invoicesRes.data);
        setContacts(contactsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return { dashboardMetrics, invoices, contacts };
}
