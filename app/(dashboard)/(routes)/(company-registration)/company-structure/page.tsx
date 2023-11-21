"use client"

import FeatureList from "@/components/feature-list";
import { Heading } from "@/components/heading";
import Paragraph from "@/components/paragraph";
import { StepHeading } from "@/components/step-heading";
import SubHeading from "@/components/sub-heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CheckSquare, XSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import { StepFooter } from "@/components/step-footer";

const CompanyStructure = () => {

  const router = useRouter();

  const [selectedCompanyStructure, setSelectedCompanyStructure] = useState<{
    name: string;
  }>({ name: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const [loading, setLoading] = useState(false);

  const handleSimpleCompanyStructure = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      toast.success("Company structure selected.");
      router.push(`/review-confirmation`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedCompanyStructure = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      toast.success("Company structure selected.");
      router.push(`/review-confirmation`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Function working!");
    } catch (error: any) {
      if (error?.response?.status === 403) {
        console.log("Function working!");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = localStorage.getItem("selectedCompanyStructure");
  //     const selectedCompanyStructure = JSON.parse(
  //       data || JSON.stringify({ name: "" })
  //     );

  //     if (!selectedCompanyStructure.name) return;

  //     selectedCompanyStructure(selectedCompanyStructure);

  //     form.reset({
  //       // prompt: form.getValues("prompt"),
  //       // businessName: selectedCompanyStructure.name,
  //     });
  //   };

  //   fetchData();
  // }, [form]);

const simpleItems = [
    {
      text: "You'll be the sole director and shareholder, and are located in Australia.",
      icon: CheckSquare,
      iconColor: "text-emerald-500",
    },
    {
      text: "Standard share setup: 100 ORD shares at $0.01 each.",
      icon: CheckSquare,
      iconColor: "text-emerald-500",
    },
    {
      text: "No trusts holding shares.",
      icon: XSquare,
      iconColor: "text-red-600",
    },
    {
      text: "No companies holding shares.",
      icon: XSquare,
      iconColor: "text-red-600",
    },
    {
      text: "No other directors, secretaries or shareholders involved.",
      icon: XSquare,
      iconColor: "text-red-600",
    },
  ];

  const advancedItems = [
    {
      text: "Option for multiple directors or shareholders.",
      icon: CheckSquare,
      iconColor: "text-emerald-500",
    },
    {
      text: "Nominate a secretary.",
      icon: CheckSquare,
      iconColor: "text-emerald-500",
    },
    {
      text: "Ability to involve trusts or holding companies as shareholders.",
      icon: CheckSquare,
      iconColor: "text-emerald-500",
    },
    {
      text: "Flexibility for a custom share setup.",
      icon: CheckSquare,
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <div>
      <Heading
        title="Incorporate a Company"
        description="Navigate the formalities of establishing your legal entity with ease."
        icon={Building2}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <StepHeading step="4" title="Choose Your Company Structure." />
      <div className="px-4 lg:px-8">
        <div className="flex items-center gap-x-3 mb-8">
          <div>
            <Paragraph
              text="To help make this next step quicker, we have created two options
                for you to choose from. Select the one that best suits your
                needs."
            />
            <SubHeading text="Simple" />
            <Paragraph text="If you are an individual setting up a single-person business, this option is tailored for you:" />
            <FeatureList items={simpleItems} />
            <SubHeading text="Advanced" />
            <Paragraph text="If you need to involve more than one person or have a more complex setup in mind, this is your choice:" />
            <FeatureList items={advancedItems} />
          </div>
        </div>
      </div>
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
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl className="m-0 p-0">
                    <div className="border border-gray-300 rounded-md shadow-sm px-3 py-2 w-full text-sm text-mute">
                      Which company structure option best suits your needs?
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="col-span-12 lg:col-span-2 w-full"
              disabled={loading}
              size="icon"
              onClick={() => handleSimpleCompanyStructure()}
            >
              Simple
            </Button>
            <Button
              type="submit"
              className="col-span-12 lg:col-span-2 w-full"
              disabled={loading}
              size="icon"
              onClick={() => handleAdvancedCompanyStructure()}
            >
              Advanced
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
        <StepFooter
          nextUrl={"/review-confirmation"}
          previousUrl={"/company-location"}
        />
      </div>
    </div>
  );
};

export default CompanyStructure;
