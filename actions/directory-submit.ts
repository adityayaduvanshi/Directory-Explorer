'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

type SubmitDirectoryData = {
  websiteLink: string;
  categories: string;
  contactInfo: string;
  runDirectory: boolean;
  message: string;
  requestedCategory: string;
};

export async function submitDirectory(data: SubmitDirectoryData) {
  const supabase = createServerComponentClient({ cookies });

  // Validate website link
  if (!isValidUrl(data.websiteLink)) {
    return { success: false, message: 'Invalid website link' };
  }

  try {
    // Insert the directory
    const { data: directoryData, error: directoryError } = await supabase
      .from('directories')
      .insert({
        website_link: data.websiteLink,
        contact_info: data.contactInfo,
        is_owner: data.runDirectory,
        message: data.message,
        status: 'pending', // This ensures new submissions start as pending
        requested_category: data.categories,
      })
      .select();

    if (directoryError) {
      throw new Error(`Failed to insert directory: ${directoryError.message}`);
    }

    if (!directoryData || directoryData.length === 0) {
      throw new Error('No directory data returned after insertion');
    }

    // Handle categories
    // if (data.categories) {
    //   const categories = data.categories.split(',').map((cat) => cat.trim());
    //   for (const category of categories) {
    //     const { error: categoryError } = await supabase
    //       .from('directory_categories')
    //       .insert({
    //         directory_id: directoryData[0].id,
    //         category_id: await getCategoryId(supabase, category),
    //       });

    //     if (categoryError) {
    //       throw new Error(
    //         `Failed to insert category: ${categoryError.message}`
    //       );
    //     }
    //   }
    // }

    console.log('Directory submitted successfully:', directoryData[0]);
    revalidatePath('/explore');
    return { success: true, message: 'Directory submitted successfully' };
  } catch (error) {
    console.error('Error submitting directory:', error);
    if (error instanceof Error) {
      return {
        success: false,
        message: `Failed to submit directory: ${error.message}`,
      };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
}

async function getCategoryId(
  supabase: any,
  categoryName: string
): Promise<string> {
  // Check if the category exists
  const { data: existingCategory } = await supabase
    .from('categories')
    .select('id')
    .eq('name', categoryName)
    .single();

  if (existingCategory) {
    return existingCategory.id;
  }

  // If the category doesn't exist, create it
  const { data: newCategory, error } = await supabase
    .from('categories')
    .insert({ name: categoryName })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create new category: ${error.message}`);
  }

  return newCategory.id;
}

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
