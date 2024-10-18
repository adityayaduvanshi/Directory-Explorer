import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPricingInfo = (pricing: string) => {
  switch (pricing.toLowerCase()) {
    case 'free':
      return { color: '#22c55e', text: 'F' }; // Green
    case 'paid':
      return { color: '#ef4444', text: 'P' }; // Red
    case 'freemium':
      return { color: '#a855f7', text: 'F' }; // Purple
    default:
      return { color: '#6b7280', text: '?' }; // Gray
  }
};
export const getDRDAColor = (value: number): string => {
  if (value >= 80) return '#22c55e'; // Bright green
  if (value >= 60) return '#84cc16'; // Lime green
  if (value >= 40) return '#eab308'; // Yellow
  if (value >= 20) return '#f97316'; // Orange
  return '#ef4444'; // Red
};
export const formatTraffic = (traffic: number): string => {
  const absTraffic = Math.abs(traffic);

  if (absTraffic >= 1e9) {
    return (traffic / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (absTraffic >= 1e6) {
    return (traffic / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (absTraffic >= 1e3) {
    return (traffic / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    return traffic.toString();
  }
};
