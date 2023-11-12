"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Download, FolderEdit, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import {
  amountOptions,
  formSchema,
  nameStyleOptions,
  resolutionOptions,
} from "./constants";
import { StepHeading } from "@/components/step-heading";

const CompanyLocation = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [businessType, setBusinessType] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      type: "random",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleLocationSelect = () => {
    toast.success("Location is available.");
    router.push(`/image`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setBusinessType(values.prompt);

      const response = await axios.post("/api/name-generator", values);
      console.log(response.data.content);
      const restData = response.data.content.split("\n").map((name: string) => {
        const nameArr = name.split("-");
        return {
          name: nameArr[0],
          slogan: nameArr[1],
        };
      });
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
        step="3"
        title="Company Location Details"
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
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Search for Address: (Australia Only)"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              onClick={() => handleLocationSelect()}              
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
              size="icon"
            >
              Continue
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyLocation;
