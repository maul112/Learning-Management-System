import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Quiz } from '@/types';
import { useForm } from '@inertiajs/react';
import {
  BookOpenIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  XCircleIcon,
} from 'lucide-react';
import { useState } from 'react';

interface QuizSectionProps {
  quiz: Quiz;
  lessonId: number;
  onQuizComplete?: (isCorrect: boolean) => void;
}

interface QuizSubmission {
  quiz_id: number;
  selected_answer: string;
}

export default function QuizSection({
  quiz,
  lessonId,
  onQuizComplete,
}: QuizSectionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const { data, setData, post, processing, reset } = useForm<QuizSubmission>({
    quiz_id: quiz.id,
    selected_answer: '',
  });

  // Parse options from JSON string
  const options =
    typeof quiz.options === 'string' ? JSON.parse(quiz.options) : quiz.options;

  const handleAnswerSelect = (value: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(value);
    setData('selected_answer', value);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    post(route('quiz.submit'), {
      onSuccess: (response: any) => {
        setIsSubmitted(true);
        const correct = selectedAnswer === quiz.answer;
        setIsCorrect(correct);
        setShowExplanation(true);
        onQuizComplete?.(correct);
      },
      onError: (errors) => {
        console.error('Quiz submission error:', errors);
      },
    });
  };

  const handleRetry = () => {
    setSelectedAnswer('');
    setIsSubmitted(false);
    setIsCorrect(null);
    setShowExplanation(false);
    reset();
  };

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D...
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5" />
          Quiz: Test Your Understanding
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{quiz.questions}</h3>

          {/* Options */}
          <RadioGroup
            value={selectedAnswer}
            onValueChange={handleAnswerSelect}
            disabled={isSubmitted}
            className="space-y-3"
          >
            {options.map((option: string, index: number) => {
              const optionKey = getOptionLabel(index);
              const isSelected = selectedAnswer === optionKey;
              const isCorrectAnswer = quiz.answer === optionKey;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-all ${
                    isSubmitted
                      ? isCorrectAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                        : isSelected && !isCorrectAnswer
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                          : 'border-muted'
                      : isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                  } `}
                >
                  <RadioGroupItem
                    value={optionKey}
                    id={`option-${index}`}
                    disabled={isSubmitted}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {optionKey}
                      </Badge>
                      {option}
                    </span>
                  </Label>

                  {/* Show correct/incorrect icons after submission */}
                  {isSubmitted && (
                    <>
                      {isCorrectAnswer && (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      )}
                      {isSelected && !isCorrectAnswer && (
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer || processing}
            className="w-full"
            size="lg"
          >
            {processing ? 'Submitting...' : 'Submit Answer'}
          </Button>
        )}

        {/* Results */}
        {isSubmitted && (
          <div className="space-y-4">
            <div
              className={`rounded-lg border-2 p-4 text-center ${
                isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                  : 'border-red-500 bg-red-50 dark:bg-red-950/20'
              } `}
            >
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircleIcon className="h-6 w-6" />
                  <span className="text-lg font-semibold">
                    Correct! Well done!
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-red-700 dark:text-red-400">
                    <XCircleIcon className="h-6 w-6" />
                    <span className="text-lg font-semibold">Incorrect</span>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    The correct answer is: <strong>{quiz.answer}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Retry Button for incorrect answers */}
            {!isCorrect && (
              <Button
                onClick={handleRetry}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
          </div>
        )}

        {/* Quiz Stats */}
        <div className="text-muted-foreground flex items-center justify-between border-t pt-4 text-sm">
          <span>Question 1 of 1</span>
          {isSubmitted && (
            <Badge variant={isCorrect ? 'default' : 'destructive'}>
              {isCorrect ? 'Passed' : 'Failed'}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
