"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { books_schema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "@/components/ColorPicker";
import { createBook } from "@/lib/actions/book.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export function BookForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof books_schema>>({
  resolver: zodResolver(books_schema),
  defaultValues: {
    title: "",
    description: "",
    author: "",
    genre: "",
    rating: 1,
    totalCopies: 1,
    coverUrl: "",
    coverColor: "",
    videoUrl: "",
    summary: "",
  },
});

  async function onSubmit(values: z.infer<typeof books_schema>) {
    try {
      const result = await createBook(values);

      if (result.success) {
        toast.success("Book created successfully", {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        router.push(`/admin/books/${result.data?.id}`);
      } else {
        toast.error(result.message, {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      }

    } catch (error) {
      console.log(error);
      toast.error("Book creation failed something went wrong ", {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Book Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Book Author"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Book Genre"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  className="book-form_input"
                  placeholder="Book Rating"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Total Copies"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center items-center">
              <FormLabel className="text-base font-normal text-dark-500 self-start">
                Image
              </FormLabel>
              <FormControl>
                <FileUpload type="image" folder="covers" onchange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onPickerChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book Description"
                  className="resize-y"
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center items-center">
              <FormLabel className="text-base font-normal text-dark-500 self-start">
                Video
              </FormLabel>
              <FormControl>
                <FileUpload onchange={field.onChange} folder="videos" type="video" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book Summary"
                  className="resize-y"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          Add Book
        </Button>
      </form>
    </Form>
  );
}
