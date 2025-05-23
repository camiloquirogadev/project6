import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (method: { cardNumber: string; expiry: string }) => void;
}

export default function AddPaymentModal({ onClose, onSave }: Props) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="text-xl mb-4">Nuevo Método de Pago</h2>
        <input
          type="text"
          placeholder="Número de tarjeta"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="MM/AA"
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => onSave({ cardNumber, expiry })}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
