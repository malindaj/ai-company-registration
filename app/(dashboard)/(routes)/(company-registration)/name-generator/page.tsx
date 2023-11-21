"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Building2,
  Download,
  FolderEdit,
  ImageIcon,
} from "lucide-react";
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
import { StepHeading } from "@/components/step-heading";

const NameGeneratorPage = () => {
  const proModal = useProModal();
  const router = useRouter();
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
  }>({ name: "", slogan: "", businessType: "" });

  const [businessType, setBusinessType] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      type: "random",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const [isLoading2, setIsLoading2] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState<string[]>([]);

  const handleNameSelect = async (
    name: string,
    slogan: string
  ): Promise<void> => {
    setSelectedName({
      name,
      slogan,
      businessType: businessType,
    });
    localStorage.setItem(
      "selectedName",
      JSON.stringify({ name, slogan, businessType })
    );

    setLoadingButtons((prev) => [...prev, name]);
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      toast.success("Name selected.");
      router.push(`/name-availability`);
    } finally {
      setLoadingButtons((prev) => prev.filter((btnId) => btnId !== name));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
        title="Incorporate a Company"
        description="Navigate the formalities of establishing your legal entity with ease."
        icon={Building2}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <StepHeading
        step="1"
        title="Define your business identity."
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
          {names.map((name) => (
            <Card key={name.name} className="rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>{name.name}</CardTitle>
                <CardDescription>{name.slogan}</CardDescription>
              </CardHeader>
              <CardFooter className="p-2 relative">
                <Button
                  onClick={async () => {
                    try {
                      setLoadingButtons((prev) => [...prev, name.name]);
                      await handleNameSelect(name.name, name.slogan);
                    } finally {
                      setLoadingButtons((prev) =>
                        prev.filter((btnId) => btnId !== name.name)
                      );
                    }
                  }}
                  disabled={
                    isLoading ||
                    isLoading2 ||
                    loadingButtons.includes(name.name)
                  }
                  variant="default"
                  className="w-full"
                >
                  {loadingButtons.includes(name.name)
                    ? "Choosing..."
                    : "Choose"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {isLoading2 && (
          <div className="p-20">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default NameGeneratorPage;
