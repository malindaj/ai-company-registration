import FeatureList from "@/components/feature-list";
import { Heading } from "@/components/heading";
import { StepHeading } from "@/components/step-heading";
import { Icon } from "@radix-ui/react-select";
import { Building2, Check, CheckCircle, CheckSquare, XSquare } from "lucide-react";

const CompanyStructure = () => {
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
              <p className="text-sm text-muted-foreground pb-4">
                To help make this next step quicker, we have created two options
                for you to choose from. Select the one that best suits your
                needs.
              </p>
              <h2 className="text-xl font-bold py-2">Simple</h2>
              <p className="text-sm text-muted-foreground pb-4">
                If you are an individual setting up a single-person business,
                this option is tailored for you:
              </p>
              <FeatureList />
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default CompanyStructure;