"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Building2, Download, FolderEdit, ImageIcon } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { StepHeading } from "@/components/step-heading";
import { StepFooter } from "@/components/step-footer";

const NameAvailabilityPage = () => {
  const proModal = useProModal();
  const router = useRouter();

  const [selectedCompanyName, setSelectedCompanyName] = useState<{
    name: string;
  }>({ name: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const [loading, setLoading] = useState(false);

  const handleNameAvailability = async () => {
    try {
      setLoading(true); // Set loading state to true
      await new Promise((resolve) => setTimeout(resolve, 5000));
      toast.success("Name is available.");
      router.push(`/company-location`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await axios.post("/api/name-generator", values);
      // console.log(response.data.content);
      console.log("Function working!");
      
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
      const data = localStorage.getItem("selectedName");
      const selectedCompanyName = JSON.parse(
        data || JSON.stringify({ name: "" })
      );

      if (!selectedCompanyName.name) return;

      setSelectedCompanyName(selectedCompanyName);

      form.reset({
        prompt: form.getValues("prompt"),
        businessName: selectedCompanyName.name,
      });
    };

    fetchData();
  }, [form]);

  return (
    <div>
      <Heading
        title="Incorporate a Company"
        description="Navigate the formalities of establishing your legal entity with ease."
        icon={Building2}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <StepHeading step="2" title="Check whether company name is available." />
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
                <FormItem className="col-span-12 lg:col-span-10">
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
            <Button
              type="submit"
              className="col-span-12 lg:col-span-2 w-full"
              disabled={loading}
              size="icon"
              onClick={() => handleNameAvailability()}
            >
              Check Availability
            </Button>
          </form>
        </Form>
        {loading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
      </div>
      <div className="px-8 my-8">
        <StepFooter nextUrl={"/company-location"} previousUrl={"/name-generator"} />
      </div>
    </div>
  );
};

export default NameAvailabilityPage;
