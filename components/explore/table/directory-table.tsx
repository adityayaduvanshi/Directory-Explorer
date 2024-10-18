/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DataTable } from '../data-table/data-table';
// import {  Directory } from '../data-table/columns';
import { getApprovedDirectories } from '@/actions/directories';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatTraffic, getDRDAColor, getPricingInfo } from '@/lib/utils';
import useDebounce from '@/hooks/use-debounce';
const TableSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-6">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="rounded-lg min-h-[300px] shadow-sm overflow-hidden border border-gray-200 bg-white"
      >
        <div className="p-2 flex flex-col h-full">
          <Skeleton className="w-full h-40 rounded-lg mb-2" />
          <div className="flex flex-col px-1 gap-1 flex-grow">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex items-center space-x-2 mt-auto py-2 px-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const DirectoryTable = () => {
  const [directories, setDirectories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
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

  const filteredDirectories = useMemo(() => {
    const searchTerms = debouncedSearchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return directories.filter((directory) => {
      const searchFields = [
        directory.name,
        directory.website_link,
        directory.primary_category_id,
        directory.description,
      ]
        .filter(Boolean)
        .map((field) => field.toLowerCase());

      const matchesSearch = searchTerms.every((term) =>
        searchFields.some((field) => field.includes(term))
      );

      const matchesCategory =
        !category ||
        category.toLowerCase() === 'all' ||
        (directory.category &&
          directory.category.toLowerCase().includes(category.toLowerCase()));

      return matchesSearch && matchesCategory;

      return matchesSearch;
    });
  }, [directories, debouncedSearchTerm, category]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:font-[400]"
        />
      </div>
      <div className="bg-white rounded-lg overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DirectoryGrid directories={filteredDirectories} />
        )}
      </div>
    </div>
  );
};

export default DirectoryTable;

const DirectoryGrid = ({ directories }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-6">
    {directories.map((directory) => (
      <DirectoryCard key={directory.id} directory={directory} />
    ))}
  </div>
);

const DirectoryCard = ({ directory }) => {
  const capitalizedPricing = directory.pricing
    ? directory.pricing.charAt(0).toUpperCase() +
      directory.pricing.slice(1).toLowerCase()
    : 'Unknown';
  return (
    <div className="rounded-lg min-h-[300px] shadow-sm overflow-hidden border border-light-600/70 dark:border-neutral-800/70 bg-light-600/20 hover:bg-light-600/70 dark:bg-[#101010] dark:hover:bg-[#191919] transition-colors duration-300 ease-in-out resource-item h-full">
      <div className="p-2 flex flex-col h-full">
        <div className="relative w-full h-40 mb-2">
          <Image
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
            layout="fill"
            objectFit="cover"
            src={
              directory.imageUrl ||
              'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={directory.name}
            className="  rounded-lg "
          />
        </div>

        <div className="flex flex-col px-1 gap-1 flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-[#303030]">
              {directory.name}
            </h3>
            <Link
              className=" cursor-pointer"
              href={directory.website_link}
              target="_blank"
            >
              <ExternalLink className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
          <div className="flex-grow">
            {directory.description && (
              <p className="text-sm text-gray-[#303030] dark:text-link line-clamp-2 text-pretty">
                {directory.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-900 mt-auto py-2 px-1">
          {directory.monthly_traffic && (
            <span>{formatTraffic(directory.monthly_traffic)} views/mo</span>
          )}
          {directory.dr_da && (
            <span className="flex items-center">
              <span
                className={`inline-block w-3 h-3   rounded-full mr-1 `}
                style={{
                  backgroundColor: getDRDAColor(Number(directory.dr_da)),
                }}
              ></span>
              {directory.dr_da} DA
            </span>
          )}
          {directory.pricing && (
            <span className="flex items-center">
              {(() => {
                return (
                  <span
                    style={{
                      backgroundColor: getPricingInfo(directory.pricing).color,
                    }}
                    className={`w-3 h-3 rounded-full flex items-center justify-center mr-1 text-xs text-white font-bold`}
                  ></span>
                );
              })()}
              {capitalizedPricing}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
