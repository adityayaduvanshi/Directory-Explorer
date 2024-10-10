import { SuggestDirectoryModal } from '@/components/explore/directory-submit-form';
import GetAlert from '../get-alert';

export function ExploreHeader() {
  return (
    <div className="space-y-2 px-2 md:px-6">
      <h1 className=" text-2xl md:text-3xl font-bold">
        Discover the best directories to explore or list products
      </h1>
      <p className="text-gray-600">
        A free and crowdsourced list of the best directory projects on the
        internet.
      </p>
      <div className="flex space-x-3">
        <SuggestDirectoryModal />
        <GetAlert />
      </div>
    </div>
  );
}
