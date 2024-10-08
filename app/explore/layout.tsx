import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Sidebar from '@/components/explore/sidebar';

export default async function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch categories from Supabase
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
