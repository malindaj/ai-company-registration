"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon } from "lucide-react";
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

const PhotoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedBusinessDetails, setSelectedBusinessDetails] = useState<{
    name: string;
    slogan: string;
    businessType: string;
  }>({ name: "", slogan: "", businessType: "" });
  


  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     prompt: "",
  //     businessName:
  //       selectedBusinessDetails.name === ""
  //         ? ""
  //         : selectedBusinessDetails.name,
  //     businessType:
  //       selectedBusinessDetails.businessType === ""
  //         ? ""
  //         : selectedBusinessDetails.businessType,
  //     slogan:
  //       selectedBusinessDetails.slogan === ""
  //         ? ""
  //         : selectedBusinessDetails.slogan,
  //   },
  // });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });


  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);

      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setPhotos(urls);
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
        title="Business Logo Generation"
        description="Create your Business Logo."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Describe what you want to in your logo."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="businessName"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border border-gray-300 rounded-md shadow-sm px-3 py-2 w-full"
                      disabled={isLoading}
                      placeholder="Business Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="slogan"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border border-gray-300 rounded-md shadow-sm px-3 py-2 w-full"
                      disabled={isLoading}
                      placeholder="Business Slogan"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="businessType"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
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
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {photos.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )}
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

export default PhotoPage;
