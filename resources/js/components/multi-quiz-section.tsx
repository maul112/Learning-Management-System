'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Quiz, QuizProgress } from '@/types';
import { useForm } from '@inertiajs/react';
import {
  BookOpenIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshCwIcon,
  XCircleIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface MultipleQuizSectionProps {
  quizzes: Quiz[];
  lessonId: number;
  onAllQuizzesComplete?: (allPassed: boolean) => void;
}

interface QuizSubmission {
  quiz_id: number;
  selected_answer: string;
}

export default function MultipleQuizSection({
  quizzes,
  lessonId,
  onAllQuizzesComplete,
}: MultipleQuizSectionProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizProgress, setQuizProgress] = useState<
    Record<number, QuizProgress>
  >({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const { data, setData, post, processing, reset } = useForm<QuizSubmission>({
    quiz_id: 0,
    selected_answer: '',
  });

  const currentQuiz = quizzes[currentQuizIndex];
  const currentProgress = quizProgress[currentQuiz?.id];

  // Initialize quiz progress
  useEffect(() => {
    const initialProgress: Record<number, QuizProgress> = {};
    quizzes.forEach((quiz) => {
      initialProgress[quiz.id] = {
        quiz_id: quiz.id,
        is_completed: false,
        is_correct: false,
      };
    });
    setQuizProgress(initialProgress);
  }, [quizzes]);

  // Update form data when current quiz changes
  useEffect(() => {
    if (currentQuiz) {
      setData('quiz_id', currentQuiz.id);
      setSelectedAnswer(currentProgress?.selected_answer || '');
    }
  }, [currentQuiz, currentProgress]);

  // Check if all quizzes are completed and passed
  useEffect(() => {
    const allCompleted = quizzes.every(
      (quiz) => quizProgress[quiz.id]?.is_completed,
    );
    const allPassed = quizzes.every(
      (quiz) => quizProgress[quiz.id]?.is_correct,
    );

    if (allCompleted) {
      onAllQuizzesComplete?.(allPassed);
    }
  }, [quizProgress, quizzes, onAllQuizzesComplete]);

  const getCompletedQuizzesCount = () => {
    return Object.values(quizProgress).filter(
      (progress) => progress.is_completed,
    ).length;
  };

  const getPassedQuizzesCount = () => {
    return Object.values(quizProgress).filter((progress) => progress.is_correct)
      .length;
  };

  const getProgressPercentage = () => {
    return (getCompletedQuizzesCount() / quizzes.length) * 100;
  };

  // Parse options from JSON string
  const options =
    typeof currentQuiz?.options === 'string'
      ? JSON.parse(currentQuiz.options)
      : currentQuiz?.options || [];

  const handleAnswerSelect = (value: string) => {
    if (currentProgress?.is_completed) return;
    setSelectedAnswer(value);
    setData('selected_answer', value);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuiz) return;

    post(route('quiz.submit'), {
      onSuccess: (response: any) => {
        const isCorrect = selectedAnswer === currentQuiz.answer;

        setQuizProgress((prev) => ({
          ...prev,
          [currentQuiz.id]: {
            quiz_id: currentQuiz.id,
            is_completed: true,
            is_correct: isCorrect,
            selected_answer: selectedAnswer,
          },
        }));
      },
      onError: (errors) => {
        console.error('Quiz submission error:', errors);
      },
    });
  };

  const handleRetry = () => {
    if (!currentQuiz) return;

    setSelectedAnswer('');
    setQuizProgress((prev) => ({
      ...prev,
      [currentQuiz.id]: {
        quiz_id: currentQuiz.id,
        is_completed: false,
        is_correct: false,
      },
    }));
    reset();
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer('');
    }
  };

  const handlePreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setSelectedAnswer('');
    }
  };

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D...
  };

  if (!currentQuiz) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5" />
            Quiz Section
          </CardTitle>
          <Badge variant="outline">
            {getCompletedQuizzesCount()} / {quizzes.length} Completed
          </Badge>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="text-muted-foreground flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
          <div className="text-muted-foreground text-xs">
            {getPassedQuizzesCount()} of {quizzes.length} quizzes passed
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quiz Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousQuiz}
            disabled={currentQuizIndex === 0}
          >
            <ChevronLeftIcon className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {quizzes.map((quiz, index) => (
              <button
                key={quiz.id}
                onClick={() => setCurrentQuizIndex(index)}
                className={`h-8 w-8 rounded-full border-2 text-xs font-medium transition-all ${
                  index === currentQuizIndex
                    ? 'border-primary bg-primary text-primary-foreground'
                    : quizProgress[quiz.id]?.is_completed
                      ? quizProgress[quiz.id]?.is_correct
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-red-500 bg-red-500 text-white'
                      : 'border-muted-foreground bg-background hover:border-primary'
                } `}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextQuiz}
            disabled={currentQuizIndex === quizzes.length - 1}
          >
            Next
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Current Quiz */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {currentProgress?.is_completed && (
              <Badge
                variant={currentProgress.is_correct ? 'default' : 'destructive'}
              >
                {currentProgress.is_correct ? 'Passed' : 'Failed'}
              </Badge>
            )}
          </div>

          <p className="text-base">{currentQuiz.questions}</p>

          {/* Options */}
          <RadioGroup
            value={selectedAnswer}
            onValueChange={handleAnswerSelect}
            disabled={currentProgress?.is_completed}
            className="space-y-3"
          >
            {options.map((option: string, index: number) => {
              const optionKey = getOptionLabel(index);
              const isSelected = selectedAnswer === optionKey;
              const isCorrectAnswer = currentQuiz.answer === optionKey;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-all ${
                    currentProgress?.is_completed
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
                    disabled={currentProgress?.is_completed}
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
                  {currentProgress?.is_completed && (
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
        {!currentProgress?.is_completed && (
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
        {currentProgress?.is_completed && (
          <div className="space-y-4">
            <div
              className={`rounded-lg border-2 p-4 text-center ${
                currentProgress.is_correct
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                  : 'border-red-500 bg-red-50 dark:bg-red-950/20'
              } `}
            >
              {currentProgress.is_correct ? (
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
                    The correct answer is: <strong>{currentQuiz.answer}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Retry Button for incorrect answers */}
            {!currentProgress.is_correct && (
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

        {/* Quiz Summary */}
        {getCompletedQuizzesCount() === quizzes.length && (
          <div className="bg-muted/20 mt-6 rounded-lg border p-4">
            <h4 className="mb-2 font-semibold">Quiz Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Quizzes:</span>
                <span className="ml-2 font-medium">{quizzes.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Passed:</span>
                <span className="ml-2 font-medium text-green-600">
                  {getPassedQuizzesCount()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Failed:</span>
                <span className="ml-2 font-medium text-red-600">
                  {getCompletedQuizzesCount() - getPassedQuizzesCount()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Success Rate:</span>
                <span className="ml-2 font-medium">
                  {Math.round((getPassedQuizzesCount() / quizzes.length) * 100)}
                  %
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
