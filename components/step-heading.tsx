interface StepHeadingProps {
  step: string;
  title: string;
}

export const StepHeading = ({ step, title }: StepHeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 pt-4 flex items-center gap-x-3 mb-8">
        <div className="flex space-x-4">
          <h2 className="text-2xl font-bold">Step {step} -</h2>
          <h2 className="text-2xl font-medium">{title}</h2>
        </div>
      </div>
    </>
  );
};
