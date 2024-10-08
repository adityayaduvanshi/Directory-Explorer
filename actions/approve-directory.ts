'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function approveDirectory(directoryId: string) {
  const supabase = createServerComponentClient({ cookies });

  // Check if the user is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: adminData } = await supabase
    .from('auth.users')
    .select('is_admin')
    .eq('id', user?.id)
    .single();

  if (!adminData?.is_admin) {
    return { success: false, message: 'Unauthorized' };
  }

  // Update the directory status
  const { error } = await supabase
    .from('directories')
    .update({ status: 'approved' })
    .eq('id', directoryId);

  if (error) {
    return {
      success: false,
      message: `Failed to approve directory: ${error.message}`,
    };
  }

  return { success: true, message: 'Directory approved successfully' };
}
