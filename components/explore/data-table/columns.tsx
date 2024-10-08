'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type Directory = {
  id: string;
  name: string;
  logo_url: string;
  monthly_traffic: number;
  dr_da: number;
  pricing: string;
  website_link: string;
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
    header: 'Monthly Traffic',
  },
  {
    accessorKey: 'dr_da',
    header: 'DR/DA',
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
  {
    accessorKey: 'website_link',
    enableSorting: false,
    header: 'Submit Link',
    cell: ({ row }) => {
      const website_link = row.getValue('website_link') as string;
      return (
        <div className="">
          <Link
            href={website_link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
          >
            Submit ↗
          </Link>
        </div>
      );
    },
  },
];
