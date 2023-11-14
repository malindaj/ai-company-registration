import { cn } from "@/lib/utils";
import { CheckSquare, XSquare } from "lucide-react";

const features = [
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
    iconColor: "text-red-700",
  },
  {
    text: "No companies holding shares.",
    icon: XSquare,
    iconColor: "text-red-700",
  },
  {
    text: "No other directors, secretaries or shareholders involved.",
    icon: XSquare,
    iconColor: "text-red-700",
  },
];

const FeatureList = () => {

  return (
    <div>
      {features.map((feature) => (
        <ul key={feature.text} className="px-6 text-sm text-muted-foreground">
          <li className="flex items-center space-x-2 py-1">
            <feature.icon className={cn("h-5 w-5 mr-3", feature.iconColor)} />
            <span className="text-sm text-muted-foreground">
              {feature.text}
            </span>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default FeatureList;
