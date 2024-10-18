import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Sidebar from '@/components/explore/sidebar';
import { Logo } from '@/components/logo/logo';
import FooterLogo from '@/components/logo/footer-logo';

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
    <div className=" h-full w-full">
      <div className="flex flex-col md:flex-row ">
        <div className="w-full md:w-64 md:flex-shrink-0">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
      <div className="flex items-center justify-between bg-black text-white p-4  ">
        <span className="text-sm font-normal pl-3">
          <FooterLogo />
        </span>
      </div>
    </div>
  );
}
