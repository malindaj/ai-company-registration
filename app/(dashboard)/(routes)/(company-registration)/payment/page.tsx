import { Heading } from "@/components/heading";
import { StepHeading } from "@/components/step-heading";
import { Building2 } from "lucide-react";

const Payment = () => {
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
          step="6"
          title="Make your payment."
        />
      </div>
    );
}
 
export default Payment;