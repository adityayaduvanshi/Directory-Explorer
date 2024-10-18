import React from 'react';
import Link from 'next/link';
// import { Search, Menu } from 'lucide-react';
import {
  Search,
  Menu,
  Globe,
  Newspaper,
  Mic,
  Youtube,
  Folder,
  PenTool,
  TrendingUp,
  Lock,
  Settings,
  Brain,
  Hammer,
  Rocket,
  Video,
} from 'lucide-react';

import { getCategories } from '@/lib/supabase';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// const categoryIcons: { [key: string]: string } = {
//   Websites: '🌐',
//   Newsletters: '📰',
//   Podcasts: '🎙️',
//   'Youtube Channels': '📺',
//   Directories: '📁',
//   'Developer Tools': '🧑',
//   Marketing: '📈',
//   'Open Source': '🔓',
//   Technology: '⚙️',
//   AI: '🤖',
//   'Indie Makers': '🛠️',
//   Startups: '🚀',
// };

const categoryIcons: { [key: string]: React.ReactNode } = {
  Websites: <Globe size={18} />,
  Newsletters: <Newspaper size={18} />,
  Podcasts: <Mic size={18} />,
  'Youtube Channels': <Youtube size={18} />,
  Directories: <Folder size={18} />,
  'Developer Tools': <PenTool size={18} />,
  Marketing: <TrendingUp size={18} />,
  'Open Source': <Lock size={18} />,
  Technology: <Settings size={18} />,
  AI: <Brain size={18} />,
  'Indie Makers': <Hammer size={18} />,
  Startups: <Rocket size={18} />,
  'Audio & Video': <Video size={18} />,
};

export default async function Sidebar() {
  const categories = await getCategories();
  const groupedCategories = [
    {
      name: 'Audio & Video',
      categories: categories.filter((c) =>
        ['Podcasts', 'Youtube Channels'].includes(c.name)
      ),
    },
    // Add more groups as needed
    {
      name: 'Other',
      categories: categories.filter(
        (c) => !['Podcasts', 'Youtube Channels'].includes(c.name)
      ),
    },
  ];
  const SidebarContent = () => (
    <aside className="w-full lg:w-72 bg-white border-r border-gray-200">
      <nav className="px-4 py-4 h-full overflow-y-auto custom-scrollbar">
        <ul className="">
          <li key="all">
            <Link
              href="/"
              className="flex items-center justify-between  px-4 py-2 mb-3 rounded-[20px] hover:bg-gray-100 text-gray-700 hover:text-blue-600"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{categoryIcons['All']}</span>
                <span className="text-[16px] font-medium ">
                  All Directories
                </span>
              </div>
              <span className="text-[16px] text-gray-500">
                {categories.length}
              </span>
            </Link>
          </li>
          {/* {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/explore?category=${encodeURIComponent(category.name)}`}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-blue-600 ml-3"
              >
                <span className="text-l">
                  {categoryIcons[category.name] || '📌'}
                </span>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            </li>
          ))} */}
          {groupedCategories.map((group) => (
            <li key={group.name} className="">
              <div className="flex items-center space-x-2 px-3 py-2  text-gray-700">
                {/* <span className="text-l">
                  {categoryIcons[group.name] || '📌'}
                </span> */}
                <span>{group.name}</span>
              </div>
              <ul className="ml-2">
                {group.categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/?category=${encodeURIComponent(category.name)}`}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-blue-600"
                    >
                      <span className="text-l">
                        {categoryIcons[category.name] || '📌'}
                      </span>
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center justify-center"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0  w-full sm:w-72">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:block">
        <SidebarContent />
      </div>
    </>
  );
}
