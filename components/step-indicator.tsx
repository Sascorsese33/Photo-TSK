import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  steps: string[];
  currentStep: number;
};

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <ol className="grid gap-3 md:grid-cols-5">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isDone = index < currentStep;

        return (
          <li
            key={step}
            className={cn(
              "rounded-lg border px-3 py-3 text-xs transition-all duration-300",
              isActive
                ? "border-gold bg-gold/10 text-gold"
                : isDone
                  ? "border-gold/40 bg-card text-white"
                  : "border-white/10 bg-card/50 text-white/60",
            )}
          >
            <span className="mr-2 font-semibold">{index + 1}.</span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
