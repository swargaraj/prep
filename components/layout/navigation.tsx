import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

export default function QuestionNavigation({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: QuestionNavigationProps) {
  return (
    <div className="flex justify-between items-center">
      <Button variant="ghost" size="sm" onClick={onPrev} disabled={disablePrev}>
        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
      </Button>
      <Button variant="ghost" size="sm" onClick={onNext} disabled={disableNext}>
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
