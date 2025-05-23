// frontend/src/pages/HelpCenter.tsx
import { useState } from 'react';

export default function HelpCenter() {
  const faqs = [
    {
      question: '¿Cómo creo una nueva factura?',
      answer: 'Ve al apartado “Invoices” y haz clic en “New Invoice”. Completa los datos y pulsa “Save”.',
    },
    {
      question: '¿Dónde configuro mi método de pago?',
      answer: 'En “Settings” encontrarás la sección “Payment Methods”. Ahí puedes añadir, editar o eliminar tarjetas.',
    },
    {
      question: '¿Cómo cambio de tema (modo oscuro/claro)?',
      answer: 'Usa el toggle ubicado en la barra lateral, sección “Need help?”. Tu preferencia se guardará automáticamente.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías enviar message/email a tu backend de soporte
    alert('Mensaje enviado. ¡Nos pondremos en contacto contigo pronto!');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>

      {/* Sección de FAQs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-md">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center px-4 py-3 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-gray-500">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openIndex === idx && (
                <p className="px-4 py-3 bg-gray-50 dark:bg-gray-800">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Contacto */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
        <form onSubmit={submitContact} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Tu correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="ejemplo@dominio.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Tu mensaje
            </label>
            <textarea
              id="message"
              rows={4}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>
          <button
            type="submit"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Enviar mensaje
          </button>
        </form>
      </section>
    </div>
);
}
