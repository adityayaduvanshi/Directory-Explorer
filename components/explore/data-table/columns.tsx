'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, BarChart } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SparklineAreaCell } from '@/components/sparkline-area-chart';
import { renderPieChart } from '@/components/harvey-pie-chart';

export type Directory = {
  id: string;
  name: string;
  logo_url: string;
  monthly_traffic: number;
  dr_da: number;
  dr_da1: number;
  pricing: string;
  website_link: string;
  primary_category_id: string;
  monthly_traffic_trend: number[];
};

export const columns: ColumnDef<Directory>[] = [
  {
    accessorKey: 'name',
    header: 'Directory',
    cell: ({ row }) => {
      const directory = row.original;
      return (
        <div className="flex items-center space-x-2">
          {directory.logo_url ? (
            <img
              src={directory.logo_url}
              alt={`${directory.name} logo`}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {directory.name?.charAt(0) || 'U'}
            </div>
          )}
          <span className="font-medium">
            {directory.name || 'Unnamed Directory'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'monthly_traffic',
    header: 'monthly traffic',
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       Monthly Traffic
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => {
      const traffic = row.getValue('monthly_traffic') as number;
      const trend = row.original.monthly_traffic_trend;
      return (
        <div className="w-full flex justify-center">
          <SparklineAreaCell data={trend} />
        </div>
      );
    },
  },
  {
    accessorKey: 'dr_da1',
    header: 'DR/DA',
    cell: ({ row }) => {
      const traffic = row.getValue('dr_da') as number;
      const dr_da1 = row.original.dr_da1;

      return (
        <div className="w-full flex justify-center">
          {renderPieChart(dr_da1)}
        </div>
      );
    },
  },
  {
    accessorKey: 'pricing',
    header: 'Pricing',
    cell: ({ row }) => {
      const pricing = row.getValue('pricing') as string;
      const capitalizedPricing = pricing
        ? pricing.charAt(0).toUpperCase() + pricing.slice(1).toLowerCase()
        : 'Unknown';
      return (
        <Badge variant={pricing.toLowerCase() === 'free' ? 'free' : 'paid'}>
          {capitalizedPricing}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'website_link',
    header: 'Website Link',
    enableSorting: false,
    cell: ({ row }) => {
      const website_link = row.getValue('website_link') as string;
      return (
        <Link
          href={website_link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
        >
          Visit ↗
        </Link>
      );
    },
  },
];
