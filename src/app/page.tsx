"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { waybillSchema } from "@/validation/waybill";
import { z } from "zod";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { ScannedWaybillDataCard } from "./_components/ui/custom/ScannedWaybillDataCard";
import { useToast } from "./_components/ui/use-toast";
import { Toaster } from "./_components/ui/toaster";

export default function Home() {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof waybillSchema>>({
    resolver: zodResolver(waybillSchema),
    defaultValues: {
      waybill: "",
    },
  });

  const { data, isPending, mutate } = api.waybill.getWaybill.useMutation({
    onSuccess: () => {
      console.log("success");
    },
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `${e.message}\n Retry in a few minutes.`,
      });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof waybillSchema>) {
    mutate({ waybill: values.waybill });
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <svg
          aria-hidden="true"
          className="inline h-16 w-16 animate-spin fill-blue-600 text-gray-200 lg:h-32 lg:w-32 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-around lg:px-8 lg:py-16">
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="waybill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waybill</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tracking Number"
                    {...field}
                    className="w-96"
                  />
                </FormControl>
                <FormDescription>
                  Waybill is a unique identifier for a package.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Track</Button>
        </form>
      </Form>
      <div className=" mt-4 flex flex-col gap-4">
        {data?.map((scan, i) => {
          return (
            <ScannedWaybillDataCard
              key={i}
              scanType={scan.Type}
              date={scan.Date}
              description={scan.StatusDescription}
              location={scan.Name}
            />
          );
        })}
      </div>
    </main>
  );
}
