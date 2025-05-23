// frontend/src/utils/overdueLogic.ts
import { Invoice } from '../types';

/**
 * Comprueba si una factura está vencida y, si procede,
 * la marca como 'overdue' y la persiste.
 *
 * @param invoice - La factura a verificar.
 * @param updateInvoice - Función para actualizar la factura en tu contexto o API.
 * @returns La factura (actualizada si ahora es overdue).
 */
export function checkAndMarkOverdue(
  invoice: Invoice,
  updateInvoice: (inv: Invoice) => void
): Invoice {
  // Fecha de hoy, sin hora
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fecha de vencimiento de la factura, sin hora
  const dueDate = new Date(invoice.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  // Si no está pagada ni enviada y ya pasó la dueDate, la marcamos overdue
  if (
    invoice.status !== 'paid' &&
    invoice.status !== 'sent' &&
    dueDate < today
  ) {
    const updated: Invoice = { ...invoice, status: 'overdue' };
    updateInvoice(updated);
    return updated;
  }

  return invoice;
}
