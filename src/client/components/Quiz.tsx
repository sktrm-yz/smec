import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

type Props = {
  index: number;
  question: Question;
};

export default function Quiz({ index, question }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === question.answerIndex;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">
          問{index}. {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {question.choices.map((choice, i) => {
            const isAnswer = i === question.answerIndex;
            const isSelected = i === selected;
            return (
              <button
                key={choice}
                type="button"
                disabled={answered}
                onClick={() => setSelected(i)}
                className={cn(
                  "rounded-md border border-border px-3 py-2 text-left text-sm transition-colors",
                  !answered && "hover:bg-muted",
                  answered &&
                    isAnswer &&
                    "border-foreground bg-muted font-medium",
                  answered &&
                    isSelected &&
                    !isAnswer &&
                    "opacity-50 line-through",
                  answered && !isSelected && !isAnswer && "opacity-50",
                )}
              >
                <span className="mr-2 text-xs text-muted-foreground">
                  {["ア", "イ", "ウ"][i]}
                </span>
                {choice}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="mt-4 rounded-md bg-muted p-3 text-sm">
            <p className="font-bold">{correct ? "正解" : "不正解"}</p>
            <p className="mt-1 text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
