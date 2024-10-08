import { SuggestDirectoryModal } from '@/components/explore/directory-submit-form';
import DirectoryTable from '@/components/explore/table/directory-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Directory Explorer</h1>
          <p className="text-sm text-gray-500">
            Find the best directories to explore or list products
          </p>
          <p className="text-sm text-gray-500">
            #550 directories listed | Community-driven | Free
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Get Alerts</Button>
          <SuggestDirectoryModal />
        </div>
      </header>

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
