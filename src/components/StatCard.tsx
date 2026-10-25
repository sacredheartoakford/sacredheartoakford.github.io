import React from 'react';
import CountUp from './CountUp';

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 2000,
  className = '',
}) => {
  return (
    <div
      className={`text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        <CountUp end={value} suffix={suffix} prefix={prefix} duration={duration} />
      </div>
      <p className="text-text font-medium">{label}</p>
    </div>
  );
};

export default StatCard;
