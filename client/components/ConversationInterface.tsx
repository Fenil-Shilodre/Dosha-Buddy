import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, User, Bot, Edit3, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  AYURVEDIC_TRAITS, 
  TRAIT_OPTIONS, 
  interpretUserInput, 
  calculatePrakruti,
  type UserResponse,
  type PrakrutiResult,
  type Trait
} from '@/lib/ayurveda';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  interpretedTraits?: Array<{traitId: string; value: string; confidence: number}>;
}

interface ConversationInterfaceProps {
  onResultCalculated: (result: PrakrutiResult) => void;
}

export function ConversationInterface({ onResultCalculated }: ConversationInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Welcome! I'll help you discover your Ayurvedic prakruti (constitution). You can either answer my questions or tell me about yourself in your own words. Let's start - how would you describe your physical build and energy levels?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lastAskedTrait, setLastAskedTrait] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getNextQuestion = (responses: UserResponse[]): { question: string; traitId: string } | null => {
    const answeredTraits = new Set(responses.map(r => r.traitId));
    const unansweredTraits = AYURVEDIC_TRAITS.filter(t => !answeredTraits.has(t.id));

    if (unansweredTraits.length === 0) return null;

    const trait = unansweredTraits[0];
    const options = TRAIT_OPTIONS[trait.id as keyof typeof TRAIT_OPTIONS];

    const question = `Tell me about your ${trait.name.toLowerCase()}: ${trait.description}. For example: ${Object.values(options).flat().slice(0, 3).join(', ')}.`;

    return { question, traitId: trait.id };
  };

  const getDomainGuidance = (traitId: string): string => {
    const trait = AYURVEDIC_TRAITS.find(t => t.id === traitId);
    const options = TRAIT_OPTIONS[traitId as keyof typeof TRAIT_OPTIONS];

    if (!trait || !options) return '';

    const allOptions = Object.values(options).flat();
    const examples = allOptions.slice(0, 4).join(', ');

    return `I need more specific information about your ${trait.name.toLowerCase()}. Please choose from options like: ${examples}. Try to be more specific about which description fits you best.`;
  };

  const isUserQuestion = (input: string): boolean => {
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'which', 'who', 'can you explain', 'tell me about', 'what is', 'what are'];
    const lowerInput = input.toLowerCase();
    return questionWords.some(word => lowerInput.includes(word)) || input.includes('?');
  };

  const generateAyurvedicAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('vata') || lowerQuestion.includes('air') || lowerQuestion.includes('space')) {
      return "Vata dosha represents the air and space elements. It governs movement, breathing, circulation, and nervous system functions. Vata types are typically creative, energetic, and quick-thinking, but can become anxious or restless when imbalanced.";
    }

    if (lowerQuestion.includes('pitta') || lowerQuestion.includes('fire') || lowerQuestion.includes('metabolism')) {
      return "Pitta dosha represents fire and water elements. It governs digestion, metabolism, and transformation in the body. Pitta types are usually focused, intelligent, and goal-oriented, but can become irritable or competitive when imbalanced.";
    }

    if (lowerQuestion.includes('kapha') || lowerQuestion.includes('earth') || lowerQuestion.includes('water')) {
      return "Kapha dosha represents earth and water elements. It governs structure, immunity, and lubrication in the body. Kapha types are typically calm, stable, and nurturing, but can become sluggish or attached when imbalanced.";
    }

    if (lowerQuestion.includes('prakruti') || lowerQuestion.includes('constitution')) {
      return "Prakruti is your natural Ayurvedic constitution - the unique combination of doshas you were born with. It remains constant throughout your life and determines your physical, mental, and emotional characteristics. Understanding your prakruti helps you make lifestyle choices that support your natural balance.";
    }

    if (lowerQuestion.includes('balance') || lowerQuestion.includes('imbalance')) {
      return "Ayurvedic balance means living in harmony with your natural constitution. Imbalances occur when lifestyle, diet, stress, or environment disturb your natural dosha proportions. The goal is to understand your prakruti and make choices that maintain your optimal state of health.";
    }

    if (lowerQuestion.includes('food') || lowerQuestion.includes('diet') || lowerQuestion.includes('eat')) {
      return "In Ayurveda, food is medicine. Each dosha benefits from different foods: Vata types need warm, nourishing foods; Pitta types benefit from cooling, moderate foods; Kapha types do well with light, spicy foods. Your ideal diet should support your constitution while balancing any current imbalances.";
    }

    return "That's a great question about Ayurveda! The ancient science of Ayurveda focuses on understanding your unique constitution to achieve optimal health and wellness. Each person has a unique combination of the three doshas - Vata, Pitta, and Kapha - which influence their physical, mental, and emotional characteristics.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    // Interpret user input
    const interpretedTraits = interpretUserInput(inputValue);
    userMessage.interpretedTraits = interpretedTraits;

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Update user responses
    const newResponses = [...userResponses];
    interpretedTraits.forEach(trait => {
      const existingIndex = newResponses.findIndex(r => r.traitId === trait.traitId);
      if (existingIndex >= 0) {
        newResponses[existingIndex] = trait;
      } else {
        newResponses.push(trait);
      }
    });
    setUserResponses(newResponses);

    // Generate bot response
    setTimeout(() => {
      let botResponse = '';

      if (interpretedTraits.length > 0) {
        const traitNames = interpretedTraits.map(t => {
          const trait = AYURVEDIC_TRAITS.find(at => at.id === t.traitId);
          return trait?.name.toLowerCase();
        }).join(', ');

        botResponse = `I understand - I've noted your ${traitNames}. `;
        setRetryCount(0); // Reset retry count on successful interpretation
      } else {
        // Check if we're asking about a specific trait and user didn't provide domain-specific answer
        if (lastAskedTrait && retryCount < 2) {
          botResponse = getDomainGuidance(lastAskedTrait);
          setRetryCount(prev => prev + 1);

          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: botResponse,
            timestamp: new Date()
          }]);
          setIsLoading(false);
          return;
        } else if (retryCount >= 2) {
          // After 2 retries, move to next question
          botResponse = "I understand it might be difficult to categorize. Let's move on to another aspect. ";
          setRetryCount(0);
          setLastAskedTrait(null);
        }
      }

      // Enhanced conversation logic - need more comprehensive assessment
      if (newResponses.length >= 8) {
        const result = calculatePrakruti(newResponses);
        botResponse += "Perfect! I have gathered comprehensive information about your constitution. Let me calculate your personalized prakruti results...";

        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: botResponse,
          timestamp: new Date()
        }]);

        setTimeout(() => {
          onResultCalculated(result);
        }, 1500);
      } else if (isUserQuestion(inputValue)) {
        // Handle user questions about Ayurveda
        const answer = generateAyurvedicAnswer(inputValue);
        botResponse += answer + " Now, let's continue with your assessment. ";

        const nextQuestionData = getNextQuestion(newResponses);
        if (nextQuestionData) {
          botResponse += nextQuestionData.question;
          setLastAskedTrait(nextQuestionData.traitId);
        }

        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: botResponse,
          timestamp: new Date()
        }]);
      } else {
        const nextQuestionData = getNextQuestion(newResponses);
        if (nextQuestionData) {
          botResponse += nextQuestionData.question;
          setLastAskedTrait(nextQuestionData.traitId);
          if (interpretedTraits.length === 0) setRetryCount(0); // Reset only if no traits interpreted
        } else {
          botResponse += "Thank you for sharing! Let me ask you a few more questions to better understand your constitution.";
          setLastAskedTrait(null);
        }

        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: botResponse,
          timestamp: new Date()
        }]);
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const editInterpretedTrait = (messageId: string, traitId: string, newValue: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.interpretedTraits) {
        const updatedTraits = msg.interpretedTraits.map(trait => 
          trait.traitId === traitId ? { ...trait, value: newValue } : trait
        );
        return { ...msg, interpretedTraits: updatedTraits };
      }
      return msg;
    }));

    // Update user responses
    setUserResponses(prev => prev.map(response => 
      response.traitId === traitId ? { ...response, value: newValue } : response
    ));
  };

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-xl border shadow-sm">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Ayurvedic Consultation</h3>
            <p className="text-xs text-muted-foreground">
              Discovered {userResponses.length} traits so far
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 max-w-[85%]",
              message.type === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              message.type === 'user' 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            
            <div className={cn(
              "flex flex-col gap-2",
              message.type === 'user' ? "items-end" : "items-start"
            )}>
              <div className={cn(
                "rounded-lg p-3 text-sm",
                message.type === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-foreground"
              )}>
                {message.content}
              </div>
              
              {message.interpretedTraits && message.interpretedTraits.length > 0 && (
                <div className="flex flex-wrap gap-1 max-w-sm">
                  {message.interpretedTraits.map((trait, index) => {
                    const traitInfo = AYURVEDIC_TRAITS.find(t => t.id === trait.traitId);
                    return (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-secondary/80"
                        onClick={() => {
                          // Future: implement trait editing
                        }}
                      >
                        {traitInfo?.name}: {trait.value}
                        <Edit3 className="w-3 h-3 ml-1 opacity-50" />
                      </Badge>
                    );
                  })}
                </div>
              )}
              
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-muted/30 rounded-b-xl">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me about yourself or answer the question above..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {userResponses.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress: {userResponses.length}/8 traits discovered</span>
              {userResponses.length >= 5 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs"
                  onClick={() => {
                    if (userResponses.length >= 3) {
                      const result = calculatePrakruti(userResponses);
                      onResultCalculated(result);
                    }
                  }}
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Calculate Now
                </Button>
              )}
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${Math.min((userResponses.length / 8) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
