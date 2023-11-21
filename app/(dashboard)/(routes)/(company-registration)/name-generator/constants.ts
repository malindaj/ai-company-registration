import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Business prompt is required"
  }),
  type: z.string().min(1),
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