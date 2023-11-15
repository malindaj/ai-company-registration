"use client"

import FeatureList from "@/components/feature-list";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import Paragraph from "@/components/paragraph";
import { StepHeading } from "@/components/step-heading";
import SubHeading from "@/components/sub-heading";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, CheckSquare, XSquare } from "lucide-react";
import { Form, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import * as z from "zod";
import axios from "axios";
import { formSchema, nameStyleOptions } from "./constants";
import { useState } from "react";
import { useRouter } from "next/router";


const CompanyStructure = () => {

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
      <StepHeading
        step="4"
        title="Choose Your Company Structure."
        iconColor="text-violet-500"
      />
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
      
    </div>
  );
};

export default CompanyStructure;
