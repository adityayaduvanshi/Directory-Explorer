'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '../data-table/data-table';
import { columns, Directory } from '../data-table/columns';
import { getApprovedDirectories } from '@/actions/directories';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

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

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search directories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="bg-white rounded-lg overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <DataTable columns={columns} data={directories} />
          </>
        )}
      </div>
    </div>
  );
};

export default DirectoryTable;
