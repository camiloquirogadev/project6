import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
  ChevronLeft,
  Edit,
  Trash2,
  Printer,
  Send,
  Download
} from 'lucide-react';

export default function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    invoices,
    contacts,
    products,
    updateInvoice,
    removeInvoice
  } = useData();

  const [invoice, setInvoice] = useState<any>(null);
  const [contact, setContact] = useState<any>(null);
  const pdfRef = useRef<HTMLDivElement>(null);


  // Carga invoice y contacto
  useEffect(() => {
    if (!id) return;

    const inv = invoices.find(i => i.id === id);
    if (!inv) {
      navigate('/invoices');
      return;
    }

    setInvoice(inv);
    setContact(contacts.find(c => c.id === inv.contactId) || null);
  }, [id, invoices, contacts, navigate]);

  if (!invoice || !contact) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading invoice details...</p>
      </div>
    );
  }

  // Devuelve nombre de producto
  const getProductInfo = (pid: string) => {
    const p = products.find(x => x.id === pid);
    return p ? p.name : 'Unknown';
  };

  // Manejadores de botones
  //edit
  const handleEdit = () => navigate(`/invoices/${invoice.id}/edit`);
  //send
  const handleSend = () => {
    const updated = { ...invoice, status: 'sent' };
    updateInvoice(updated);
    setInvoice(updated);
  };
  //print
  const handlePrint = () => window.print();
  //download
  const handleDownload = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${invoice.number}.pdf`);
  };
  //delete
  const handleDelete = () => {
    if (window.confirm('¿Delete this invoice? This action cannot be undone.')) {
      removeInvoice(invoice.id);
      navigate('/invoices');
    }
  };

  // Mark as Paid
  const handleMarkPaid = () => {
    const updated = { ...invoice, status: 'paid' };
    updateInvoice(updated);
    setInvoice(updated);
    window.alert('Invoice has been marked as paid!');
  };

  // Mark as Sent
  const handleMarkSent = () => {
    const updated = { ...invoice, status: 'sent' };
    updateInvoice(updated);
    setInvoice(updated);
    window.alert('Invoice has been marked as sent!');
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/invoices')}
            className="mr-4 p-2 rounded hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{invoice.number}</h1>
            <div className="flex items-center mt-1">
              <StatusBadge status={invoice.status} />
              <span className="ml-2 text-sm text-gray-500">
                Created on {new Date(invoice.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={handleEdit} className="btn btn-secondary flex items-center">
            <Edit size={16} className="mr-1" /> Edit
          </button>
          <button onClick={handleSend} className="btn btn-secondary flex items-center">
            <Send size={16} className="mr-1" /> Send
          </button>
          <button onClick={handlePrint} className="btn btn-secondary flex items-center">
            <Printer size={16} className="mr-1" /> Print
          </button>
          <button onClick={handleDownload} className="btn btn-secondary flex items-center">
            <Download size={16} className="mr-1" /> Download
          </button>
          <button onClick={handleDelete} className="btn btn-danger flex items-center">
            <Trash2 size={16} className="mr-1" /> Delete
          </button>
        </div>
      </div>

      {/* Invoice Content */}
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <h2 className="text-xl font-bold text-blue-600 mb-1">Invoice</h2>
                <p className="text-gray-600">{invoice.number}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Date:</p>
                  <p className="text-sm font-medium">{new Date(invoice.date).toLocaleDateString()}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Due Date:</p>
                  <p className="text-sm font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-0 sm:text-right">
                <div className="inline-block">
                  <p className="text-sm text-gray-500">From:</p>
                  <p className="text-sm font-medium">Your Company Name</p>
                  <p className="text-sm">123 Business Street</p>
                  <p className="text-sm">City, State 12345</p>
                  <p className="text-sm">accounting@yourcompany.com</p>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 mb-1">Bill To:</p>
              <p className="text-sm font-medium">{contact.name}</p>
              <p className="text-sm">{contact.address}</p>
              <p className="text-sm">{contact.city}, {contact.postalCode}</p>
              <p className="text-sm">{contact.country}</p>
              <p className="text-sm">{contact.email}</p>
            </div>

            {/* Items */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-base font-medium mb-4">Items</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoice.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <div className="font-medium text-gray-900">
                            {getProductInfo(item.productId)}
                          </div>
                          <div className="text-gray-500">{item.description}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${item.price.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${item.subtotal.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-base font-medium mb-4">Summary</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-medium">${invoice.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Tax (0%)</span>
                  <span className="text-sm font-medium">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-base font-bold">${invoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {invoice.status !== 'paid' ? (
                  <button
                    onClick={handleMarkPaid}
                    className="w-full btn btn-primary"
                  >
                    Mark as Paid
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full btn btn-primary opacity-50 cursor-default"
                  >
                    Pagado
                  </button>
                )}
                {invoice.status === 'draft' && (
                  <button onClick={handleMarkSent} className="w-full btn btn-secondary">
                    Mark as Sent
                  </button>
                )}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium mb-2">Payment Details</h4>
                <p className="text-xs text-gray-500">
                  Bank: National Bank<br />
                  Account: 1234567890<br />
                  IBAN: US12 3456 7890 1234<br />
                  SWIFT: NTBKUS12
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}