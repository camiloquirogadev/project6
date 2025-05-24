import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { Zap, Plus, ExternalLink, Trash2 } from 'lucide-react';

const mockIntegrations = [
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate tasks with 6000+ apps',
    logo: 'https://cdn.worldvectorlogo.com/logos/zapier.svg',
    connected: true,
    link: 'https://zapier.com/app/integrations',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync your events and meetings',
    logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    connected: false,
    link: 'https://calendar.google.com/',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications and updates in Slack',
    logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
    connected: false,
    link: 'https://slack.com/apps',
  },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(mockIntegrations);

  useEffect(() => {
    document.title = 'Integrations | Zowu';
  }, []);

  const toggleConnection = (id: string) => {
    setIntegrations(prev =>
      prev.map(item =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Zap size={24} /> Integrations
        </h1>
        <button className="btn btn-primary flex items-center">
          <Plus size={16} className="mr-1" /> Add Integration
        </button>
      </div>

      <Card title="Available Integrations">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img src={integration.logo} alt={integration.name} className="h-10 w-10" />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {integration.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {integration.description}
                </p>
                <div className="mt-2 flex gap-2">
                  <a
                    href={integration.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <ExternalLink size={14} /> Manage
                  </a>
                  <button
                    onClick={() => toggleConnection(integration.id)}
                    className={`text-xs font-medium px-2 py-1 rounded-md transition ${
                      integration.connected
                        ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {integration.connected ? 'Connected' : 'Connect'}
                  </button>
                  {integration.connected && (
                    <button
                      onClick={() => toggleConnection(integration.id)}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
