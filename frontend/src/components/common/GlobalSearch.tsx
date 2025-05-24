// src/components/common/GlobalSearch.tsx
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Input } from '@/components/ui/Input';
import Card from '@/components/ui/Card';

interface SearchResult {
  id: string;
  type: 'invoice' | 'contact' | 'product';
  label: string;
  description: string;
}

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) return setResults([]);
      const res = await api.get(`/search?q=${query}`);
      setResults(res.data);
    };
    const delay = setTimeout(fetchResults, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        placeholder="Search invoices, contacts, products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <Card className="absolute z-10 w-full mt-2 p-2">
          {results.map((item) => (
            <div key={item.id} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
