"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Liam",
    avatar: "L",
    title: "Corporate Legal Advisor",
    description:
      "As a legal professional, this application has streamlined our company registration processes. The AI platform brings an unmatched level of efficiency!",
  },
  {
    name: "Ava",
    avatar: "A",
    title: "Business Owner",
    description:
      "Registering my company was a breeze with this app. The AI capabilities made the process quick and error-free. Highly recommended!",
  },
  {
    name: "Henry",
    avatar: "H",
    title: "Technology Entrepreneur",
    description:
      "As someone deeply involved in technology ventures, this platform has been a game-changer for managing company registrations. The AI features add a futuristic touch.",
  },
  {
    name: "Charlotte",
    avatar: "C",
    title: "Financial Consultant",
    description:
      "The integration of AI in this company registration tool is brilliant. It has significantly improved accuracy in financial documentation. A must-have for consultants!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mr-2">
                  <p className="text-lg text-white">{item.avatar}</p>
                </div>
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
