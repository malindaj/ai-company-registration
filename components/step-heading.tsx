import { Icon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StepHeadingProps {
  step: string;
  title: string;
  icon: Icon;
  iconColor?: string;
}

export const StepHeading = ({
  step,
  title,
  icon: Icon,
  iconColor,
}: StepHeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 pt-4 flex items-center gap-x-3 mb-8">
        {/* <div className={cn("p-2 w-fit rounded-md")}>
          <Icon className={cn("w-8 h-8", iconColor)} />
        </div> */}
        <div className="flex space-x-4">
          <h2 className="text-2xl font-bold">Step {step} -</h2>
          <h2 className="text-2xl font-medium">{title}</h2>
        </div>
      </div>
    </>
  );
};
