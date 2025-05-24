import { useEffect, useState } from 'react';
import { CalendarDays, Plus } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';

export default function CalendarPage() {
  const [events, setEvents] = useState<{ date: string; title: string }[]>([]);
  const [newEvent, setNewEvent] = useState({ date: '', title: '' });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.title = 'Calendar | Zowu';
  }, []);

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.title) {
      setEvents(prev => [...prev, newEvent]);
      setNewEvent({ date: '', title: '' });
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
          <CalendarDays /> Calendar
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> New Event
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{event.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {format(new Date(event.date), 'PPP')}
            </p>
          </div>
        ))}
        {events.length === 0 && <p className="text-gray-500 dark:text-gray-400">No events scheduled.</p>}
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-md z-20">
          <Dialog.Title className="text-lg font-bold mb-4 dark:text-white">Add New Event</Dialog.Title>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              className="input input-bordered w-full"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
              className="input input-bordered w-full"
            />
            <button onClick={handleAddEvent} className="btn btn-primary w-full">Save</button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
} 
