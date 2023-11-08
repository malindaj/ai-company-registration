"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import {
  amountOptions,
  formSchema,
  nameStyleOptions,
  resolutionOptions,
} from "./constants";

const NameGeneratorPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [names, setNames] = useState<
    {
      name: string;
      slogan: string;
    }[]
  >([]);
  const [selectedName, setSelectedName] = useState<{
    name: string;
    slogan: string;
    businessType: string;
  }>({ name: "", slogan: "" , businessType: ""});

  const [businessType, setBusinessType] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      type: "random",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleNameSelect = (name: string, slogan: string) => {
    setSelectedName({
      name,
      slogan,
      businessType: businessType,
    });
    toast.success("Name selected.");
    localStorage.setItem('selectedName', JSON.stringify({ name, slogan, businessType }));
    router.push(`/image`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);
      setNames([]);
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

      setNames(restData);

      //const urls = response.data.map((image: { url: string }) => image.url);

      //setPhotos(urls);
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
        title="Business Name Generation"
        description="Tell us your business type and business nature and we will generate a list of business names for you to choose from."
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
                <FormItem className="col-span-12 lg:col-span-7">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Describe your business type and business nature."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-3">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nameStyleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label + " - " + option.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
        {names.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {names.map((name) => (
            <Card key={name.name} className="rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>{name.name}</CardTitle>
                <CardDescription>{name.slogan}</CardDescription>
              </CardHeader>

              <CardFooter className="p-2">
                <Button
                  onClick={() => handleNameSelect(name.name, name.slogan)}
                  variant="default"
                  className="w-full"
                >
                  {/* <Download className="h-4 w-4 mr-2" /> */}
                  Choose
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NameGeneratorPage;
