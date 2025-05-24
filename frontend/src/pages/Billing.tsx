import { useEffect } from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

export default function Billing() {
  useEffect(() => {
    document.title = 'Billing | Zowu';
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <DollarSign size={24} /> Billing
      </h1>

      {/* Plan actual */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Current Plan</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">You're currently on the <strong>Pro Plan</strong>, billed monthly.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
            Change Plan
          </button>
        </div>
      </section>

      {/* Métodos de pago */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Payment Method</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CreditCard size={20} className="text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-800 dark:text-white">Visa ending in 4242</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/26</p>
              </div>
            </div>
            <button className="text-blue-600 text-sm hover:underline">Edit</button>
          </div>

          <button className="mt-4 w-full px-4 py-2 text-sm bg-white dark:bg-gray-700 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
            + Add new payment method
          </button>
        </div>
      </section>
    </div>
  );
}
