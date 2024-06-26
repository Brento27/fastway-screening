"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
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
import { useToast } from "./_components/ui/use-toast";
import { Toaster } from "./_components/ui/toaster";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import ParcelDataLoader from "./_components/ui/custom/ParcelDataLoader";
import ParcelDataCardList from "./_components/ui/custom/ParcelDataCardList";

const Home = () => {
  const { toast } = useToast();

  // Get the search params from the URL
  const searchParams = useSearchParams();

  // Get the pathname from the URL
  const pathname = usePathname();

  // eslint-disable-next-line
  const { replace } = useRouter();

  // Query to get waybill data from the URL on load
  const { data: waybillQueryData, isFetching } =
    api.waybill.getWaybillFromParams.useQuery({
      waybill: searchParams.get("waybill") ?? "",
    });

  // Define your form.
  const form = useForm<z.infer<typeof waybillSchema>>({
    resolver: zodResolver(waybillSchema),
    defaultValues: {
      waybill: "",
    },
  });

  // Access form values
  const formValues = form.watch();

  // Mutation to get waybill data
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

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof waybillSchema>) {
    const params = new URLSearchParams(searchParams);
    params.set("waybill", values.waybill);
    replace(`${pathname}?${params.toString()}`);
    mutate({ waybill: values.waybill });
  }

  // Render the component
  return (
    <>
      <Toaster />
      <main className="flex flex-col items-center gap-8  px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-20 lg:py-16">
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-80 gap-4 space-y-8 md:w-96 lg:w-[380px]"
            >
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
                        className="w-56 md:w-72 lg:w-96"
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
          {isPending || (isFetching && searchParams.get("waybill")) ? (
            <ParcelDataLoader
              waybill={searchParams.get("waybill") ?? formValues.waybill}
            />
          ) : data ? (
            <ParcelDataCardList
              data={data}
              waybill={searchParams.get("waybill") ?? formValues.waybill}
            />
          ) : (
            <ParcelDataCardList
              data={waybillQueryData}
              waybill={searchParams.get("waybill") ?? formValues.waybill}
            />
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
