// frontend/src/pages/InvoiceForm.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import Card from '../../../components/ui/Card';
import { Plus, Trash2 } from 'lucide-react';

export default function InvoiceForm() {
  const navigate = useNavigate();
  const { contacts, products, addInvoice } = useData();

  const [contactId, setContactId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<{
    id: string;
    productId: string;
    description: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[]>([]);

  // calculate total
  const total = items.reduce((sum, i) => sum + i.subtotal, 0);

  // add initial row
  useEffect(() => {
    if (items.length === 0) addRow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addRow() {
    setItems(prev => [
      ...prev,
      { id: Date.now().toString(), productId: '', description: '', quantity: 1, price: 0, subtotal: 0 }
    ]);
  }

  function removeRow(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateRow(id: string, field: keyof typeof items[0], value: any) {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i;
      const next = { ...i, [field]: value };
      if (field === 'productId') {
        const prod = products.find(p => p.id === value);
        if (prod) {
          next.price = prod.price;
          next.description = prod.name;
        }
      }
      next.subtotal = next.price * next.quantity;
      return next;
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newInvoice = {
      id: Date.now().toString(),
      number: `INV-${Date.now()}`,
      date,
      dueDate,
      contactId,
      status: "draft" as "draft",
      items,
      total
    };
    addInvoice(newInvoice);
    navigate(`/invoices/${newInvoice.id}`);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card>
        <h1 className="text-2xl font-bold mb-4">New Invoice</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Contact</label>
              <select
                value={contactId}
                onChange={e => setContactId(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select contact...</option>
                {contacts.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h2 className="text-lg font-medium mb-2">Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Subtotal</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(row => (
                    <tr key={row.id} className="border-t">
                      <td className="px-4 py-2">
                        <select
                          value={row.productId}
                          onChange={e => updateRow(row.id, 'productId', e.target.value)}
                          className="w-full border px-2 py-1 rounded"
                          required
                        >
                          <option value="">Select product</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min={1}
                          value={row.quantity}
                          onChange={e => updateRow(row.id, 'quantity', parseInt(e.target.value))}
                          className="w-16 border px-2 py-1 rounded text-right"
                          required
                        />
                      </td>
                      <td className="px-4 py-2 text-right">${row.price.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right">${row.subtotal.toFixed(2)}</td>
                      <td className="px-4 py-2 text-center">
                        <button type="button" onClick={() => removeRow(row.id)} className="text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" onClick={addRow} className="mt-2 flex items-center text-blue-600">
              <Plus size={16} className="mr-1" /> Add Item
            </button>
          </div>

          {/* Total & Submit */}
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
