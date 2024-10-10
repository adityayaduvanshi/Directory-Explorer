'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { submitDirectory } from '@/actions/directory-submit';
import {
  directorySubmitSchema,
  DirectorySubmitValues,
} from '@/schema/submission-form';

export function SuggestDirectoryModal() {
  const [open, setOpen] = useState(false);
  //   const { toast } = useToast()

  const form = useForm<DirectorySubmitValues>({
    resolver: zodResolver(directorySubmitSchema),
    defaultValues: {
      websiteLink: '',
      categories: '',
      contactInfo: '',
      runDirectory: false,
      message: '',
    },
  });

  async function onSubmit(values: DirectorySubmitValues) {
    try {
      console.log(values);
      const result = await submitDirectory(values);
      if (result.success) {
        // toast({
        //   title: "Success",
        //   description: result.message,
        // })
        setOpen(false);
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting directory:', error);
      //   toast({
      //     title: "Error",
      //     description: error instanceof Error ? error.message : "Failed to submit directory. Please try again.",
      //     variant: "destructive",
      //   })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-black rounded-2xl " size="sm">
          + Suggest a Directory
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Suggest a directory</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="websiteLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Category1, Category2, ..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Use comma (,) to add multiple categories. Add up to 5
                    categories.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address / Twitter link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="runDirectory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I run this directory</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Go back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
