import { createClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const createServerSupabaseClient = () =>
  createServerComponentClient({ cookies });

export async function getCategories() {
  const supabase = createServerSupabaseClient();
  console.log('Fetching categories...');
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  console.log('Categories data:', data);
  console.log('Error:', error);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}
