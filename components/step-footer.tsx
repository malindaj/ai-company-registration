import { useState } from "react";
import { Button } from "./ui/button";
import { Loader } from "./loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface StepFooterProps {
  nextUrl: string;
  previousUrl: string;
}

export const StepFooter = ({ nextUrl, previousUrl }: StepFooterProps) => {
  const router = useRouter();

  const goNextPage = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(nextUrl);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const goPreviousPage = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(previousUrl);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div
        className="
              rounded-lg 
              bg-gray-100 
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
          className="col-span-12 lg:col-span-3 w-full"
          disabled={loading}
          size="icon"
          variant={"outline"}
          onClick={() => goPreviousPage()}
        >
          Back
        </Button>
        <div className="col-span-12 lg:col-span-6"></div>
        <Button
          className="col-span-12 lg:col-span-3 w-full"
          disabled={loading}
          size="icon"
          onClick={() => goNextPage()}
        >
          Next
        </Button>
      </div>
      {loading && (
        <div className="p-20">
          <Loader />
        </div>
      )}
    </>
  );
};
