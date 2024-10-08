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
          {['All', ...categories.map((category) => category.name)].map(
            (categoryName) => (
              <li key={categoryName}>
                <Link
                  href={
                    categoryName === 'All'
                      ? '/explore'
                      : `/explore?category=${encodeURIComponent(
                          categoryName.toLowerCase()
                        )}`
                  }
                  className="flex items-center space-x-3 px-3 py-1 rounded-md transition-colors duration-150 hover:bg-blue-50 text-gray-700 hover:text-blue-600"
                >
                  <span className="text-xl">
                    {categoryIcons[categoryName] || '📌'}
                  </span>
                  <span className="text-sm font-medium">{categoryName}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
