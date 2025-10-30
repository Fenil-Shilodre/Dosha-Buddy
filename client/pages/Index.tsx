import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, MessageCircle, FileText, Sparkles, Users, Clock } from 'lucide-react';
import { ConversationInterface } from '@/components/ConversationInterface';
import { QuestionnaireInterface } from '@/components/QuestionnaireInterface';
import { PrakrutiResults } from '@/components/PrakrutiResults';
import { type PrakrutiResult } from '@/lib/ayurveda';

type AppMode = 'welcome' | 'conversation' | 'questionnaire' | 'results';

export default function Index() {
  const [appMode, setAppMode] = useState<AppMode>('welcome');
  const [prakrutiResult, setPrakrutiResult] = useState<PrakrutiResult | null>(null);

  const handleResultCalculated = (result: PrakrutiResult) => {
    setPrakrutiResult(result);
    setAppMode('results');
  };

  const handleStartOver = () => {
    setPrakrutiResult(null);
    setAppMode('welcome');
  };

  const handleStartConversation = () => {
    setAppMode('conversation');
  };

  const handleStartQuestionnaire = () => {
    setAppMode('questionnaire');
  };

  if (appMode === 'results' && prakrutiResult) {
    return <PrakrutiResults result={prakrutiResult} onStartOver={handleStartOver} />;
  }

  if (appMode === 'conversation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Leaf className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold">Discover Your Prakruti</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Share your experiences and let our AI guide you through understanding your unique Ayurvedic constitution
              </p>
            </div>
            
            <ConversationInterface onResultCalculated={handleResultCalculated} />
            
            <div className="mt-6 text-center">
              <Button variant="ghost" onClick={handleStartOver} className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Switch to Different Method
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (appMode === 'questionnaire') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FileText className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold">Structured Assessment</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Answer specific questions about your traits to determine your prakruti
              </p>
            </div>
            
            <QuestionnaireInterface
              onResultCalculated={handleResultCalculated}
              onBack={handleStartOver}
            />
          </div>
        </div>
      </div>
    );
  }

  // Welcome screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Leaf className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Discover Your Prakruti
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Uncover your unique Ayurvedic constitution through personalized assessment. 
              Learn whether you're primarily Vata (air & space), Pitta (fire & water), 
              Kapha (earth & water), or a balanced combination.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="secondary" className="px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Analysis
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Traditional Wisdom
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                5-10 Minutes
              </Badge>
            </div>
          </div>

          {/* Method Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30" onClick={handleStartConversation}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Conversational Discovery</CardTitle>
                <CardDescription className="text-base">
                  Share your experiences naturally and let our AI guide the conversation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Natural, flowing conversation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>AI interprets your responses</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Edit and refine interpretations</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Adaptive questioning</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button className="w-full group-hover:bg-primary/90" onClick={handleStartConversation}>
                    Start Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30" onClick={handleStartQuestionnaire}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <FileText className="w-8 h-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Structured Questionnaire</CardTitle>
                <CardDescription className="text-base">
                  Answer specific questions about your physical and mental traits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full" />
                    <span>Traditional assessment method</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full" />
                    <span>Clear, specific questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full" />
                    <span>Multiple choice format</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full" />
                    <span>Systematic evaluation</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="secondary" className="w-full" onClick={handleStartQuestionnaire}>
                    Start Questionnaire
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What You'll Learn */}
          <Card className="mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">What You'll Discover</CardTitle>
              <CardDescription>
                Your prakruti assessment will reveal insights about your natural constitution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-vata/10 rounded-full flex items-center justify-center">
                    <span className="text-3xl">💨</span>
                  </div>
                  <h3 className="font-semibold text-lg">Your Primary Dosha</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify whether you're primarily Vata, Pitta, Kapha, or a balanced combination
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-pitta/10 rounded-full flex items-center justify-center">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-lg">Detailed Breakdown</h3>
                  <p className="text-sm text-muted-foreground">
                    See the percentage distribution of each dosha and contributing traits
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-kapha/10 rounded-full flex items-center justify-center">
                    <span className="text-3xl">💡</span>
                  </div>
                  <h3 className="font-semibold text-lg">Balancing Tips</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized recommendations for diet, lifestyle, and wellness
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Ayurveda */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Understanding the Doshas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3 p-4 bg-vata/5 rounded-lg border border-vata/20">
                  <div className="text-4xl">💨</div>
                  <h3 className="font-semibold text-lg">Vata</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Air & Space</strong><br />
                    Creative, energetic, quick-thinking. Governs movement, breathing, and circulation.
                  </p>
                </div>
                
                <div className="text-center space-y-3 p-4 bg-pitta/5 rounded-lg border border-pitta/20">
                  <div className="text-4xl">🔥</div>
                  <h3 className="font-semibold text-lg">Pitta</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fire & Water</strong><br />
                    Focused, determined, intelligent. Governs digestion, metabolism, and transformation.
                  </p>
                </div>
                
                <div className="text-center space-y-3 p-4 bg-kapha/5 rounded-lg border border-kapha/20">
                  <div className="text-4xl">🌍</div>
                  <h3 className="font-semibold text-lg">Kapha</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Earth & Water</strong><br />
                    Calm, stable, nurturing. Governs structure, immunity, and lubrication.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
