import React from "react";
import { CheckSquare, Icon, XSquare } from "lucide-react";
import FeatureListItem from "./feature-list-item";

interface Feature {
  text: string;
  icon: Icon;
  iconColor: string;
}

interface FeatureListProps {
  items: Feature[];
}

const FeatureList = ({ items }:FeatureListProps) => {
  return (
    <div className="pb-4">
      {items.map((item, index) => (
        <FeatureListItem key={index} {...item} />
      ))}
    </div>
  );
};

export default FeatureList;
