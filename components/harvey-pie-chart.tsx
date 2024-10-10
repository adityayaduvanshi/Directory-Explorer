'use client';
import { PieChart, Pie, Cell } from 'recharts';
export const getColor = (percentage: number) => {
  if (percentage < 25) return 'text-gray-400';
  if (percentage < 50) return 'text-orange-400';
  return 'text-green-500';
};

const getPieColor = (percentage: number) => {
  if (percentage < 25) return '#71717a'; // Gray color
  if (percentage < 50) return '#f97316'; // Orange color
  return '#22c55e'; // Green color
};
export const renderPieChart = (percentage: number) => {
  if (percentage === 100) {
    return (
      <svg width="40" height="40">
        <circle cx="20" cy="20" r="20" fill="black" />
      </svg>
    );
  }

  const data = [{ value: percentage }, { value: 100 - percentage }];

  return (
    <div className="flex items-center gap-4">
      <PieChart width={40} height={40}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={20}
          startAngle={90}
          endAngle={-270}
        >
          <Cell fill={getPieColor(percentage)} />
          <Cell fill="#e5e7eb" />
        </Pie>
      </PieChart>
      <span className={`font-medium ${getColor(percentage)}`}>
        {percentage}%
      </span>
    </div>
  );
};
