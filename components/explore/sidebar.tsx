import Link from 'next/link';
import React from 'react';
import { getCategories } from '@/lib/supabase';

const categoryIcons: { [key: string]: string } = {
  All: '🏠',
  Websites: '🌐',
  Newsletters: '📰',
  Podcasts: '🎙️',
  'Youtube Channels': '📺',
  Directories: '📁',
  'Developer Tools': '🧑',
  Marketing: '📈',
  'Open Source': '🔓',
  Technology: '⚙️',
  AI: '🤖',
  'Indie Makers': '🛠️',
  Startups: '🚀',
  // Add more categories and their corresponding icons as needed
};

const Sidebar = async () => {
  const categories = await getCategories();

  return (
    <aside className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <nav className="px-4 py-8 h-screen overflow-y-auto custom-scrollbar">
        <ul className="space-y-1">
          <li key="all">
            <Link
              href="/explore"
              className="flex items-center space-x-3 px-3 py-1 rounded-md transition-colors duration-150 hover:bg-blue-50 text-gray-700 hover:text-blue-600"
            >
              <span className="text-xl">{categoryIcons['All'] || '🏠'}</span>
              <span className="text-sm font-medium">All</span>
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/explore?category=${encodeURIComponent(category.id)}`}
                className="flex items-center space-x-3 px-3 py-1 rounded-md transition-colors duration-150 hover:bg-blue-50 text-gray-700 hover:text-blue-600"
              >
                <span className="text-xl">
                  {categoryIcons[category.name] || '📌'}
                </span>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
