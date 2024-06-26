"use client";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../_components/ui/use-toast";
import { z } from "zod";
import { QuotePriceCalculationSchema } from "@/validation/QuotePriceCalculation";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../_components/ui/popover";
import { Button } from "../_components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../_components/ui/command";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/debounce";
import { Input } from "../_components/ui/input";
import { Skeleton } from "../_components/ui/skeleton";
import QuoteDetails from "../_components/ui/custom/QuoteDetails";
import Service from "../_components/ui/custom/Service";
import { Toaster } from "../_components/ui/toaster";

const Quotes = () => {
  // Tracks the open state of the location search dropdown
  const [open, setOpen] = useState(false);

  // Mutation to get location data
  const {
    mutate: getLocation,
    isPending: loadingTowns,
    data: locationData = [],
  } = api.quotes.getLocation.useMutation({
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `${e.message}\n Retry in a few minutes.`,
      });
    },
  });

  // Define the form
  const form = useForm<z.infer<typeof QuotePriceCalculationSchema>>({
    resolver: zodResolver(QuotePriceCalculationSchema),
    defaultValues: {
      height: "",
      length: "",
      postcode: "",
      sendingToTown: "",
      weight: 0,
      width: "",
    },
  });

  // Access form values
  const formValues = form.watch();

  // Debounce for 1 second - Location search
  const debouncedSendingToTown = useDebounce(formValues.sendingToTown, 1000);

  // Mutation to get quote
  const {
    data: quoteData,
    mutate: getQuote,
    isPending: loadingQuote,
  } = api.quotes.getPriceCalculationQuote.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Quote successfully generated",
        variant: "default",
      });
    },
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `${e.message}\n Retry in a few minutes.`,
      });
    },
  });

  // Submit handler
  const onSubmit = (values: z.infer<typeof QuotePriceCalculationSchema>) => {
    console.log(values);
    getQuote(values);
  };

  // Tracks the length of the town input to search for location
  useEffect(() => {
    if (debouncedSendingToTown.length >= 3) {
      getLocation({ town: debouncedSendingToTown });
    }
  }, [debouncedSendingToTown]);

  // Render the component
  return (
    <>
      <div className="relative mx-4 p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-6 rounded-lg lg:w-full "
          >
            <FormField
              control={form.control}
              name="sendingToTown"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-white">Sending to *</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="w-full">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? field.value : "Select Town..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0 lg:w-96 ">
                      <Command className="w-full">
                        <CommandInput
                          className="w-full"
                          placeholder="Search Town..."
                          onInput={(e) => {
                            form.setValue(
                              "sendingToTown",
                              e.currentTarget.value.toUpperCase(),
                            );
                          }}
                        />
                        <CommandList>
                          <CommandEmpty>
                            {loadingTowns ? "Loading..." : "No town found."}
                          </CommandEmpty>
                          <CommandGroup>
                            {locationData.map((location, i) => (
                              <CommandItem
                                key={location.Town}
                                value={location.Town}
                                onSelect={(currentValue) => {
                                  form.setValue(
                                    "sendingToTown",
                                    currentValue === formValues.sendingToTown
                                      ? ""
                                      : location.Town,
                                  );
                                  form.setValue("postcode", location.Postcode);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formValues.sendingToTown == location.Town
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {location.Town}, {location.Postcode},
                                {location.State}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the town where the parcel will be delivered to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem className="w-1/3 ">
                    <FormLabel className="text-white">Postcode *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0000"
                        {...field}
                        onKeyDown={(e) => {
                          // Allow backspace, delete, tab, escape, enter, and arrow keys
                          if (
                            e.key === "Backspace" ||
                            e.key === "Delete" ||
                            e.key === "Tab" ||
                            e.key === "Escape" ||
                            e.key === "Enter" ||
                            (e.key >= "0" && e.key <= "9")
                          ) {
                            return;
                          }
                          // Prevent all other keys
                          e.preventDefault();
                        }}
                        onInput={(e) => {
                          // Ensure the value is numeric
                          const value = e.currentTarget.value;
                          if (!/^\d*$/.test(value)) {
                            e.currentTarget.value = value.replace(/[^\d]/g, "");
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel className="text-white">Weight (kg) *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="5"
                        {...field}
                        onKeyDown={(e) => {
                          // Allow backspace, delete, tab, escape, enter, and arrow keys
                          if (
                            e.key === "Backspace" ||
                            e.key === "." ||
                            e.key === "Delete" ||
                            e.key === "Tab" ||
                            e.key === "Escape" ||
                            e.key === "Enter" ||
                            (e.key >= "0" && e.key <= "9")
                          ) {
                            return;
                          }
                          // Prevent all other keys
                          e.preventDefault();
                        }}
                        onInput={(e) => {
                          const value = e.currentTarget.value;
                          // Allow only digits and a single decimal point
                          if (!/^\d*\.?\d*$/.test(value)) {
                            e.currentTarget.value = value.replace(
                              /[^0-9.]/g,
                              "",
                            );
                          }
                          // Ensure only one decimal point is allowed
                          if (value.split(".").length > 2) {
                            e.currentTarget.value = value.replace(/\.+$/, "");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-1/3"></div>
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem className="w-1/3 ">
                    <FormLabel className="text-white">Length (cm)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="30"
                        {...field}
                        onKeyDown={(e) => {
                          // Allow backspace, delete, tab, escape, enter, and arrow keys
                          if (
                            e.key === "Backspace" ||
                            e.key === "Delete" ||
                            e.key === "Tab" ||
                            e.key === "Escape" ||
                            e.key === "Enter" ||
                            (e.key >= "0" && e.key <= "9")
                          ) {
                            return;
                          }
                          // Prevent all other keys
                          e.preventDefault();
                        }}
                        onInput={(e) => {
                          // Ensure the value is numeric
                          const value = e.currentTarget.value;
                          if (!/^\d*$/.test(value)) {
                            e.currentTarget.value = value.replace(/[^\d]/g, "");
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="w-1/3 ">
                    <FormLabel className="text-white">Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="30"
                        {...field}
                        onKeyDown={(e) => {
                          // Allow backspace, delete, tab, escape, enter, and arrow keys
                          if (
                            e.key === "Backspace" ||
                            e.key === "Delete" ||
                            e.key === "Tab" ||
                            e.key === "Escape" ||
                            e.key === "Enter" ||
                            (e.key >= "0" && e.key <= "9")
                          ) {
                            return;
                          }
                          // Prevent all other keys
                          e.preventDefault();
                        }}
                        onInput={(e) => {
                          // Ensure the value is numeric
                          const value = e.currentTarget.value;
                          if (!/^\d*$/.test(value)) {
                            e.currentTarget.value = value.replace(/[^\d]/g, "");
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem className="w-1/3 ">
                    <FormLabel className="text-white">Width (cm)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="30"
                        {...field}
                        onKeyDown={(e) => {
                          // Allow backspace, delete, tab, escape, enter, and arrow keys
                          if (
                            e.key === "Backspace" ||
                            e.key === "Delete" ||
                            e.key === "Tab" ||
                            e.key === "Escape" ||
                            e.key === "Enter" ||
                            (e.key >= "0" && e.key <= "9")
                          ) {
                            return;
                          }
                          // Prevent all other keys
                          e.preventDefault();
                        }}
                        onInput={(e) => {
                          // Ensure the value is numeric
                          const value = e.currentTarget.value;
                          if (!/^\d*$/.test(value)) {
                            e.currentTarget.value = value.replace(/[^\d]/g, "");
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="relative w-full bg-white text-lg font-bold text-black hover:bg-slate-300"
            >
              {loadingQuote ? "Loading..." : "Get Quote Now"}
            </Button>
          </form>
        </Form>
        {loadingQuote && <Skeleton className="mt-8 h-40 w-full bg-slate-300" />}
        {quoteData && (
          <div className="mt-8 flex flex-col gap-1 md:gap-2">
            <QuoteDetails
              delfranchise={quoteData.delfranchise}
              delivery_timeframe_days={quoteData.delivery_timeframe_days}
              from={quoteData.from}
              to={quoteData.to}
            />
            {quoteData.services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, translateX: -150 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.5, delay: i * 0.3 }}
              >
                <Service option={i} service={service} key={i} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Quotes;
