'use client';
import { SuggestDirectoryModal } from '@/components/explore/directory-submit-form';
import { ExploreHeader } from '@/components/explore/header';
import DirectoryTable from '@/components/explore/table/directory-table';
import GetAlert from '@/components/get-alert';
import { Logo } from '@/components/logo/logo';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Suspense } from 'react';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}

function ExploreContent() {
  return (
    <div className="space-y-12   overflow-y-auto custom-scrollbar">
      <header className="hidden md:flex px-2 md:px-6 justify-between  items-start">
        <Logo />
        <div className=" flex items-center gap-x-5">
          <GetAlert />
          <Button
            onClick={() => window.open('/https://tally.so/', '_blank')}
            className=" bg-black rounded-[5rem] px-6 "
            size="sm"
          >
            <PlusIcon className=" h-4 w-4 mr-1" /> Suggest a Directory
          </Button>

          {/* <SuggestDirectoryModal /> */}
        </div>
      </header>
      <ExploreHeader />
      <div className="bg-white p-6 rounded-lg ">
        {/* <div className="mb-4">
   
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
            Category 1
          </span>
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
            Category 2
          </span>
    
        </div>
      </div> */}

        <DirectoryTable />
      </div>
    </div>
  );
}
