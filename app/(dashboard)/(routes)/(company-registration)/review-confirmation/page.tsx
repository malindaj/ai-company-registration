"use client"

import { Heading } from "@/components/heading";
import { StepHeading } from "@/components/step-heading";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "@/components/loader";

const ReviewConfirmation = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        try {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          toast.success("Details confirmed.");
          router.push(`/payment`);
        } catch (error) {
          toast.error("Something went wrong.");
        } finally {
          setLoading(false);
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
          step="5"
          title="Review & confirm your provided details."
          iconColor="text-violet-500"
        />
        <div className="px-8">
          <div
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              mb-4
              md:px-6 
              md:mb-4
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-4
            "
          >
            <div className="col-span-12 lg:col-span-7">
              <div className="m-0 p-0">
                <div className="border border-gray-300 bg-gray-100 rounded-md shadow-sm px-3 py-2 w-full text-sm text-mute">
                  Company name:
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="m-0 p-0">
                <div className="border border-gray-300 bg-gray-100 rounded-md shadow-sm px-3 py-2 w-full text-sm text-mute">
                  AI Generated name
                </div>
              </div>
            </div>
          </div>
          <div
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              mb-4
              md:px-6
              md:mb-4 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-4
            "
          >
            <div className="col-span-12 lg:col-span-7">
              <div className="m-0 p-0">
                <div className="border border-gray-300 bg-gray-100 rounded-md shadow-sm px-3 py-2 w-full text-sm text-mute">
                  Company location:
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="m-0 p-0">
                <div className="border border-gray-300 bg-gray-100 rounded-md shadow-sm px-3 py-2 w-full text-sm text-mute">
                  Selected location
                </div>
              </div>
            </div>
          </div>
          <div
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              mb-4
              md:px-6 
              md:mb-4
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-4
            "
          >
            <div className="col-span-12 lg:col-span-7">
              <div className="m-0 p-0">
                <div className="border border-gray-300 bg-gray-100 rounded-md shadow-sm px-3 py-2 w-full text-sm text-mute">
                  Company structure:
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="m-0 p-0">
                <div className="border border-gray-300 bg-gray-100 rounded-md shadow-sm px-3 py-2 w-full text-sm text-mute">
                  Simple
                </div>
              </div>
            </div>
          </div>
          <div
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              mb-4
              md:px-6 
              md:mb-4
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-4
            "
          >
            <Button
              type="submit"
              className="col-span-12 lg:col-span-3 w-full"
              // disabled={loading || !form.watch("prompt")}
              size="icon"
              // onClick={() => handleLocation()}
            >
              Back
            </Button>
            <div className="col-span-12 lg:col-span-6"></div>
            <Button
              type="submit"
              className="col-span-12 lg:col-span-3 w-full"
              // disabled={loading || !form.watch("prompt")}
              size="icon"
              onClick={() => handleNext()}
            >
              Next
            </Button>
          </div>
          {loading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
        </div>
      </div>
    );
}
 
export default ReviewConfirmation;