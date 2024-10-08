'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function getApprovedDirectories() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from('directories')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching directories:', error);
    return [];
  }

  return data;
}
