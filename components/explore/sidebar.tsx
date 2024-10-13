import React from 'react'
import Link from 'next/link'
import { Search, Menu } from "lucide-react"
import { getCategories } from '@/lib/supabase'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const categoryIcons: { [key: string]: string } = {
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
}

export default async function Sidebar() {
  const categories = await getCategories()

  const SidebarContent = () => (
    <aside className="w-full lg:w-72 bg-white border-r border-gray-200">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <nav className="px-4 py-2 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
        <ul className="space-y-1">
          <li key="all">
            <Link
              href="/explore"
              className="flex items-center justify-between border border-gray-300 px-4 py-2 mb-3 rounded-[20px] hover:bg-gray-100 text-gray-700 hover:text-blue-600"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{categoryIcons['All']}</span>
                <span className="text-sm font-medium ">All Directories</span>
              </div>
              <span className="text-sm text-gray-500">364</span>
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/explore?category=${encodeURIComponent(category.id)}`}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-blue-600 ml-3"
              >
                <span className="text-l">
                  {categoryIcons[category.name] || '📌'}
                </span>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="flex items-center justify-center">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0  w-full sm:w-72">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:block" >
        <SidebarContent />
      </div>
    </>
  )
}