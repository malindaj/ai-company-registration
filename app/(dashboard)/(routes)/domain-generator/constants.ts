import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Business prompt is required"
  }),
  type: z.string().min(1),
  businessName: z.string().min(1, {
    message: "Business name is required"
  }),
  businessType: z.string().min(1, {
    message: "Business Category is required"
  }),
});

export const nameStyleOptions = [
  {
    value: "random",
    label: "Random",
    description: "Randomly generated names"
  },
  {
    value: "simple",
    label: "Simple",
    description: "Simple names"
  },
  {
    value: "compound words",
    label: "Compound",
    description: "Compound names like FedEx and Microsoft"
  },
  {
    value: "Alternate Spelling",
    label: "Alternate Spelling",
    description: "Alternate spelling names like Lyft and Fiverr"
  },
  {
    value: "Evocative",
    label: "Evocative",
    description: "Evocative names like RedBull and Forever21"
  },
  {
    value: "Brandable",
    label: "Brandable",
    description: "Brandable names like Google and Rolex"
  },
  {
    value: "Non-English names",
    label: "Non-English",
    description: "Non-English names like Toyota and Audi"
  },
  {
    value: "Real words",
    label: "Real words",
    description: "Real words like Apple and Amazon"
  }
]

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo"
  },
  {
    value: "2",
    label: "2 Photos"
  },
  {
    value: "3",
    label: "3 Photos"
  },
  {
    value: "4",
    label: "4 Photos"
  },
  {
    value: "5",
    label: "5 Photos"
  }
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];

