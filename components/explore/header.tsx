import { SuggestDirectoryModal } from '@/components/explore/directory-submit-form';
import GetAlert from '../get-alert';

export function ExploreHeader() {
  return (
    <div className="space-y-2 pt-20 md:pt-0 px-2 md:px-6  ">
      <h1 className=" text-2xl text-gray-900 md:text-3xl font-bold">
        Discover the best directories to explore or list products
      </h1>
      <p className="text-gray-600 text-[18px]">
        A free and crowdsourced list of the best directory projects on the
        internet.
      </p>
      <div className="flex pt-4 space-x-5">
        <SuggestDirectoryModal />
        <GetAlert />
      </div>
    </div>
  );
}
