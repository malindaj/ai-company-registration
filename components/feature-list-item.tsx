import { cn } from "@/lib/utils";
import { Icon } from "lucide-react";

interface FeatureListItemProps {
  text: String;
  icon: Icon;
  iconColor: String;
}

const FeatureListItem = ({
  text,
  icon: Icon,
  iconColor,
}: FeatureListItemProps) => {
  return (
    <div>
      <ul className="px-6 text-sm text-muted-foreground">
        <li className="flex items-center space-x-2 py-1">
          <Icon className={cn("h-5 w-5 mr-3", iconColor)} />
          <span className="text-sm text-muted-foreground">{text}</span>
        </li>
      </ul>
    </div>
  );
};
 
export default FeatureListItem;