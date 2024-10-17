'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { DataTable } from '../data-table/data-table';
import { columns, Directory } from '../data-table/columns';
import { getApprovedDirectories } from '@/actions/directories';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

const TableSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full" />
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} className="h-16 w-full" />
    ))}
  </div>
);

const DirectoryTable = () => {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  useEffect(() => {
    const fetchDirectories = async () => {
      setIsLoading(true);
      try {
        const data = await getApprovedDirectories();
        setDirectories(data);
      } catch (error) {
        console.error('Error fetching directories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDirectories();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  const debouncedSearch = useDebounce(handleSearch, 300);

  const filteredDirectories = directories.filter((directory) => {
    const searchFields = [
      directory.name,
      directory.website_link,

      directory.primary_category_id,
    ].filter(Boolean);

    const matchesSearch = searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesCategory =
      !category ||
      category.toLowerCase() === 'all' ||
      directory.primary_category_id === category;
    // directory.secondary_category_ids?.includes(category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:font-[400]"
          />
      </div>
      <div className="bg-white rounded-lg overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <DataTable columns={columns} data={filteredDirectories} />
          </>
        )}
      </div>
    </div>
  );
};

export default DirectoryTable;
