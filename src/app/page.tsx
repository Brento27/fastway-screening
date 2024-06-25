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
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Skeleton } from "./_components/ui/skeleton";
import { motion } from "framer-motion";
import { Suspense } from "react";

const Home = () => {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line
  const { replace } = useRouter();

  const { data: waybillQueryData, isFetching } =
    api.waybill.getWaybillFromParams.useQuery({
      waybill: searchParams.get("waybill") ?? undefined,
    });

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
    const params = new URLSearchParams(searchParams);
    params.set("waybill", values.waybill);
    replace(`${pathname}?${params.toString()}`);
    mutate({ waybill: values.waybill });
  }

  return (
    <>
      <Toaster />
      <main className="flex min-h-screen flex-col items-center bg-black px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-32 lg:py-16">
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="waybill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Waybill</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tracking Number"
                        {...field}
                        className="w-96 "
                      />
                    </FormControl>
                    <FormDescription>
                      Waybill is a unique identifier for a package.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-slate-300"
              >
                Track
              </Button>
            </form>
          </Form>
        </div>
        <div className=" mt-4 flex flex-col gap-4">
          {isPending ? (
            <>
              <Skeleton className="h-36 w-[380px] bg-slate-300" />
              <Skeleton className="h-36 w-[380px] bg-slate-300" />
              <Skeleton className="h-36 w-[380px] bg-slate-300" />
              <Skeleton className="h-36 w-[380px] bg-slate-300" />
            </>
          ) : isFetching && searchParams.get("waybill") ? (
            <>
              <Skeleton className="h-36 w-[380px] bg-slate-300" />
              <Skeleton className="h-36 w-[380px] bg-slate-300" />
              <Skeleton className="h-36 w-[380px] bg-slate-300" />
              <Skeleton className="h-36 w-[380px] bg-slate-300" />
            </>
          ) : data ? (
            waybillQueryData?.map((scan, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, translateX: -150 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.2 }}
                >
                  <ScannedWaybillDataCard
                    key={i}
                    scanType={scan.Type}
                    date={scan.Date}
                    description={scan.StatusDescription}
                    location={scan.Name}
                  />
                </motion.div>
              );
            })
          ) : (
            waybillQueryData?.map((scan, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, translateX: -150 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.2 }}
                >
                  <ScannedWaybillDataCard
                    key={i}
                    scanType={scan.Type}
                    date={scan.Date}
                    description={scan.StatusDescription}
                    location={scan.Name}
                  />
                </motion.div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
};

// Wrap Home component with Suspense for the dynamic import
export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
