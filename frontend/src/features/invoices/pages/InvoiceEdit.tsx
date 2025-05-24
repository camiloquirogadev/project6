import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
// Update the import path below to the correct location of Button and Input components.
// For example, if they are in 'components/ui/Button' and 'components/ui/Input', import them like this:
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

interface InvoiceForm {
  date: string;
  dueDate: string;
  // aquí podrías agregar status, items, total, etc. si quieres editarlos
}

export default function InvoiceEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { invoices, updateInvoice } = useData();
  const original = invoices.find(i => i.id === id);
  
  const [form, setForm] = useState<InvoiceForm>({
    date: original?.date.split('T')[0] || '',
    dueDate: original?.dueDate.split('T')[0] || '',
  });

  useEffect(() => {
    if (!original) {
      navigate('/invoices');
    }
  }, [original, navigate]);

  const handleChange = (field: keyof InvoiceForm, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!original) return;

    // Merge: tomamos el objeto completo, y sólo reemplazamos las fechas
    updateInvoice({
      ...original,
      date:    new Date(form.date).toISOString(),
      dueDate: new Date(form.dueDate).toISOString(),
    });

    navigate(`/invoices/${id}`, { replace: true });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Editar Factura {id}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Fecha</label>
          <Input
            type="date"
            value={form.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('date', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Vencimiento</label>
          <Input
            type="date"
            value={form.dueDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('dueDate', e.target.value)}
          />
        </div>
        {/* Si quieres editar items o total, añádelos a InvoiceForm y a los Inputs correspondientes */}
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={() => navigate(-1)} variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
