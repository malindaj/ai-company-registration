"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Download, FolderEdit, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProModal } from "@/hooks/use-pro-modal";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { StepHeading } from "@/components/step-heading";

const NameAvailabilityPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedBusinessDetails, setSelectedBusinessDetails] = useState<{
    name: string;
    slogan: string;
    businessType: string;
  }>({ name: "", slogan: "", businessType: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const handleNameAvailability = () => {
    toast.success("Name is available.");
    router.push(`/company-location`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/name-generator", values);
      console.log(response.data.content);
      
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Assuming the local storage could have changed, we fetch it every time this effect runs
      const data = localStorage.getItem("selectedName");
      const selectedName = JSON.parse(
        data || JSON.stringify({ name: "", slogan: "", businessType: "" })
      );

      // If there is no name, we don't want to do anything
      if (!selectedName.name) return;

      setSelectedBusinessDetails(selectedName);

      // Now, we reset the form with the new default values
      form.reset({
        prompt: form.getValues("prompt"), // keeps the current 'prompt' value
        businessName: selectedName.name,
        businessType: selectedName.businessType,
        slogan: selectedName.slogan,
      });
    };

    fetchData();
  }, [form]);

  return (
    <div>
      <Heading
        title="Company Name Generation"
        description="Tell us your business type and business nature and we will generate a list of company names for you to choose from."
        icon={FolderEdit}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <StepHeading
        step="2"
        title="Check whether the generated name is available or not."
        icon={ArrowRight}
        iconColor="text-violet-500"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
          >
            <FormField
              name="businessName"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-3">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border border-gray-300 rounded-md shadow-sm px-3 py-2 w-full"
                      disabled={isLoading}
                      placeholder="Company Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="slogan"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border border-gray-300 rounded-md shadow-sm px-3 py-2 w-full"
                      disabled={isLoading}
                      placeholder="Company Slogan"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="businessType"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-3">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border border-gray-300 rounded-md shadow-sm px-3 py-2 w-full"
                      disabled={isLoading}
                      placeholder="Business Type"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              onClick={() => handleNameAvailability()}
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
              size="icon"
            >
              Check Availability
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {/* {photos.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )} */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {photos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image fill alt="Generated" src={src} />
              </div>
              <CardFooter className="p-2">
                <Button
                  onClick={() => window.open(src)}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NameAvailabilityPage;
