import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  period: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  period,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const isPositive = change >= 0;
  
  // Format the value based on whether it should be a currency or not
  const formattedValue = prefix === '$' 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    : `${prefix}${value.toLocaleString()}${suffix}`;
    
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {formattedValue}
        </p>
      </div>
      <div className="mt-2 flex items-center">
        <span
          className={`inline-flex items-center text-xs font-medium mr-2 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isPositive ? (
            <TrendingUp size={14} className="mr-1" />
          ) : (
            <TrendingDown size={14} className="mr-1" />
          )}
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-gray-500">{period}</span>
      </div>
    </div>
  );
};

export default MetricCard;