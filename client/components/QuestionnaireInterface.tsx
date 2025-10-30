import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Check, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  AYURVEDIC_TRAITS, 
  TRAIT_OPTIONS, 
  calculatePrakruti,
  type UserResponse,
  type PrakrutiResult,
  type Trait
} from '@/lib/ayurveda';

interface QuestionnaireInterfaceProps {
  onResultCalculated: (result: PrakrutiResult) => void;
  onBack: () => void;
}

interface QuestionData {
  trait: Trait;
  options: Array<{ dosha: string; value: string }>;
}

const DOSHA_COLORS = {
  vata: 'border-vata bg-vata/10 hover:bg-vata/20 text-vata-foreground',
  pitta: 'border-pitta bg-pitta/10 hover:bg-pitta/20 text-pitta-foreground',
  kapha: 'border-kapha bg-kapha/10 hover:bg-kapha/20 text-kapha-foreground'
};

export function QuestionnaireInterface({ onResultCalculated, onBack }: QuestionnaireInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Prepare questions from traits - include ALL options for comprehensive choice
  const questions: QuestionData[] = AYURVEDIC_TRAITS.map(trait => {
    const options = TRAIT_OPTIONS[trait.id as keyof typeof TRAIT_OPTIONS];
    const formattedOptions = Object.entries(options).flatMap(([dosha, values]) =>
      values.map(value => ({ dosha, value }))
    );
    return { trait, options: formattedOptions };
  });

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Safety check - if no current question, show loading or error state
  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-4 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading questions...</p>
        </Card>
      </div>
    );
  }

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (!selectedOption || !currentQuestion) return;

    // Create response with high confidence since it's explicit selection
    const response: UserResponse = {
      traitId: currentQuestion.trait.id,
      value: selectedOption,
      confidence: 0.9
    };

    // Update responses
    const newResponses = [...userResponses];
    const existingIndex = newResponses.findIndex(r => r.traitId === currentQuestion.trait.id);
    if (existingIndex >= 0) {
      newResponses[existingIndex] = response;
    } else {
      newResponses.push(response);
    }
    setUserResponses(newResponses);

    if (isLastQuestion) {
      // Calculate results
      const result = calculatePrakruti(newResponses);
      onResultCalculated(result);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Load previous response if exists
      const prevQuestion = questions[currentQuestionIndex - 1];
      if (prevQuestion) {
        const prevResponse = userResponses.find(r => r.traitId === prevQuestion.trait.id);
        setSelectedOption(prevResponse?.value || '');
      }
    }
  };

  const handleSkip = () => {
    if (isLastQuestion && userResponses.length >= 3) {
      const result = calculatePrakruti(userResponses);
      onResultCalculated(result);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return '🏋️';
      case 'mental': return '🧠';
      case 'lifestyle': return '🌟';
      case 'preferences': return '❤️';
      default: return '📝';
    }
  };

  const getDoshaEmoji = (dosha: string) => {
    switch (dosha) {
      case 'vata': return '💨';
      case 'pitta': return '🔥';
      case 'kapha': return '🌍';
      default: return '⚖️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-4">
      <div className="max-w-6xl mx-auto w-full h-screen flex flex-col">
        {/* Header - Fixed height */}
        <div className="flex items-center justify-between py-3 flex-shrink-0">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Badge variant="outline" className="gap-2">
            <FileText className="w-3 h-3" />
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>

        {/* Progress - Fixed height */}
        <div className="space-y-1 flex-shrink-0 mb-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}% Complete</span>
            <span>{userResponses.length} answered</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        {/* Question Card - Flexible height with proper spacing */}
        <Card className="border-2 bg-card/95 backdrop-blur flex-1 flex flex-col mb-4">
          {/* Question Header - Fixed height */}
          <CardHeader className="text-center pb-4 flex-shrink-0">
            <div className="flex items-center justify-center mb-2">
              <div>
                <div className="flex flex-row items-center justify-center">
                  <div className="text-2xl mx-auto">{getCategoryIcon(currentQuestion.trait.category)}</div>
                  <CardTitle className="text-xl mx-auto">{currentQuestion.trait.name}</CardTitle>
                </div>
                <CardDescription className="text-sm mt-1">
                  {currentQuestion.trait.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-4 flex-1 flex flex-col">
            {/* Options Grid - Takes available space without overlapping */}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option.value)}
                    className={cn(
                      "p-3 rounded-lg border-2 text-left transition-all duration-200 relative group min-h-[100px]",
                      "hover:shadow-md active:scale-95",
                      selectedOption === option.value
                        ? DOSHA_COLORS[option.dosha as keyof typeof DOSHA_COLORS]
                        : "border-border bg-card hover:border-accent/50 hover:bg-accent/5"
                    )}
                  >
                    {/* Dosha indicator */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{getDoshaEmoji(option.dosha)}</span>
                      {selectedOption === option.value && (
                        <div className="w-5 h-5 bg-current rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-background" />
                        </div>
                      )}
                    </div>

                    {/* Option text */}
                    <div className="space-y-1">
                      <p className="font-medium text-sm leading-tight">{option.value}</p>
                      <Badge variant="outline" className="text-xs capitalize">
                        {option.dosha}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Help text - Fixed at bottom of card */}
            <div className="text-center flex-shrink-0 border-t pt-3">
              <p className="text-xs text-muted-foreground">
                Choose the option that best describes your natural tendencies
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation - Fixed at bottom */}
        <div className="flex items-center justify-between flex-shrink-0 py-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-sm"
            >
              Skip
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              {isLastQuestion ? (
                <>
                  <Check className="w-4 h-4" />
                  Get Results
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Compact summary - Fixed at bottom */}
        {userResponses.length > 0 && (
          <div className="text-center flex-shrink-0 py-1">
            <p className="text-xs text-muted-foreground">
              Progress: {userResponses.length}/{questions.length} questions completed
              {userResponses.length >= 3 && " • Ready for results!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
