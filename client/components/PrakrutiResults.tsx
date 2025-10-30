import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Share2, Lightbulb, TrendingUp, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type PrakrutiResult } from '@/lib/ayurveda';

interface PrakrutiResultsProps {
  result: PrakrutiResult;
  onStartOver: () => void;
}

const DOSHA_COLORS = {
  vata: {
    bg: 'bg-vata/10',
    text: 'text-vata-foreground',
    border: 'border-vata/20',
    progress: 'bg-vata'
  },
  pitta: {
    bg: 'bg-pitta/10', 
    text: 'text-pitta-foreground',
    border: 'border-pitta/20',
    progress: 'bg-pitta'
  },
  kapha: {
    bg: 'bg-kapha/10',
    text: 'text-kapha-foreground', 
    border: 'border-kapha/20',
    progress: 'bg-kapha'
  }
};

const DOSHA_DESCRIPTIONS = {
  vata: {
    element: "Air & Space",
    qualities: "Light, dry, cold, rough, subtle, mobile",
    characteristics: "Creative, enthusiastic, quick-thinking, adaptable"
  },
  pitta: {
    element: "Fire & Water", 
    qualities: "Hot, sharp, light, slightly oily, liquid, mobile",
    characteristics: "Focused, determined, intelligent, goal-oriented"
  },
  kapha: {
    element: "Earth & Water",
    qualities: "Heavy, slow, cool, oily, smooth, dense, stable",
    characteristics: "Calm, stable, nurturing, patient, loyal"
  }
};

export function PrakrutiResults({ result, onStartOver }: PrakrutiResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'tips'>('overview');
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case 'vata': return '💨';
      case 'pitta': return '🔥';
      case 'kapha': return '🌍';
      default: return '⚖️';
    }
  };

  const getConstitutionBadgeColor = () => {
    if (result.constitution.includes('-') || result.constitution === 'tridoshic') {
      return 'bg-gradient-to-r from-vata/20 via-pitta/20 to-kapha/20 text-foreground border-muted-foreground/20';
    }
    // Use the light green color from the diff for confidence badge
    return 'text-foreground border-muted-foreground/20';
  };

  const handleDownload = () => {
    const content = generateDownloadContent(result);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ayurvedic-prakruti-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    setIsSharing(true);
    const shareText = generateShareText(result);

    try {
      if (navigator.share) {
        // Use native sharing if available (mobile)
        await navigator.share({
          title: 'My Ayurvedic Prakruti Results',
          text: shareText,
          url: window.location.href
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } else {
        // Use robust fallback method
        copyToClipboardFallback(shareText);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (error) {
      // If native share fails, use fallback
      try {
        copyToClipboardFallback(shareText);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (fallbackError) {
        console.error('All sharing methods failed:', fallbackError);
        // Show user-friendly message
        alert('Unable to share automatically. Please copy the text manually from the download file.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboardFallback = (text: string) => {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);

    // Focus and select the text
    textArea.focus();
    textArea.select();

    try {
      // Use the older execCommand method
      const successful = document.execCommand('copy');
      if (!successful) {
        throw new Error('execCommand copy failed');
      }
    } catch (error) {
      // If execCommand fails, try modern clipboard API as last resort
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      } else {
        throw new Error('No clipboard method available');
      }
    } finally {
      // Clean up
      document.body.removeChild(textArea);
    }
  };

  const generateDownloadContent = (result: PrakrutiResult): string => {
    const date = new Date().toLocaleDateString();

    return `
AYURVEDIC PRAKRUTI ASSESSMENT RESULTS
Generated on: ${date}
Assessment by: Discover Your Prakruti App

═══════════════════════════════════════

🔍 YOUR CONSTITUTION: ${result.constitution.toUpperCase()}
📊 CONFIDENCE LEVEL: ${result.confidence}%

═══════════════════════════════════════

📈 DOSHA DISTRIBUTION:
• Vata (Air & Space): ${Math.round(result.scores.vata)}%
• Pitta (Fire & Water): ${Math.round(result.scores.pitta)}%
• Kapha (Earth & Water): ${Math.round(result.scores.kapha)}%

═══════════════════════════════════════

📝 CONSTITUTION EXPLANATION:
${result.explanation}

════════���══════════════════════════════

🌟 TOP CONTRIBUTING TRAITS:
${result.topTraits.slice(0, 5).map((item, index) =>
  `${index + 1}. ${item.trait.name} (Score: ${item.contribution.toFixed(1)})`
).join('\n')}

═══════════════════════════════════════

💡 PERSONALIZED BALANCING TIPS:
${result.balancingTips.map((tip, index) =>
  `${index + 1}. ${tip.replace(/🧘‍♀️|🕐|🍲|🌿|💆‍♀️|🌡️|⚖️|🥒|🧊|🌅|🏃‍♀️|🌶️|⏰|🔥|🌟/g, '').trim()}`
).join('\n\n')}

═══════════════════════════════════════

📚 GENERAL GUIDANCE:
Remember that your prakruti is your natural constitution - it doesn't change throughout your life. However, your current state (vikriti) can become imbalanced due to lifestyle, diet, stress, and environment.

For personalized health advice, please consult with a qualified Ayurvedic practitioner or healthcare provider.

═══════════════════════════════════════

Generated by Discover Your Prakruti
Ancient wisdom meets modern technology
    `.trim();
  };

  const generateShareText = (result: PrakrutiResult): string => {
    return `🌿 Just discovered my Ayurvedic Prakruti!

My constitution: ${result.constitution} (${result.confidence}% confidence)

📊 Dosha breakdown:
• Vata: ${Math.round(result.scores.vata)}%
• Pitta: ${Math.round(result.scores.pitta)}%
• Kapha: ${Math.round(result.scores.kapha)}%

${result.explanation}

Discover your unique Ayurvedic constitution and get personalized wellness recommendations! 🧘‍♀️✨

#Ayurveda #Wellness #Prakruti #Doshas #NaturalHealth`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onStartOver}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Start New Assessment
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleShare}
            disabled={isSharing}
          >
            {shareSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                {isSharing ? <Copy className="w-4 h-4 animate-pulse" /> : <Share2 className="w-4 h-4" />}
                Share
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Result Card */}
      <Card className="overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-br from-primary/5 to-accent/10">
          <div className="flex justify-center mb-4">
            <div className="text-6xl">
              {getDoshaIcon(result.primaryDosha)}
            </div>
          </div>
          <CardTitle className="text-2xl">
            Your Prakruti: {result.constitution.charAt(0).toUpperCase() + result.constitution.slice(1)}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {result.explanation}
          </CardDescription>
          <div className="flex justify-center mt-4">
            <Badge
              className={cn("text-sm px-4 py-2", getConstitutionBadgeColor())}
              style={{ backgroundColor: 'rgba(184, 233, 134, 1)' }}
            >
              {result.confidence}% Confidence
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'breakdown', label: 'Detailed Breakdown', icon: TrendingUp },
          { id: 'tips', label: 'Balancing Tips', icon: Lightbulb }
        ].map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            style={activeTab === tab.id ? { backgroundColor: 'rgba(65, 117, 5, 1)' } : {}}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dosha Scores */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Dosha Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(result.scores).map(([dosha, score]) => {
                const colors = DOSHA_COLORS[dosha as keyof typeof DOSHA_COLORS];
                const description = DOSHA_DESCRIPTIONS[dosha as keyof typeof DOSHA_DESCRIPTIONS];
                
                return (
                  <div key={dosha} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getDoshaIcon(dosha)}</span>
                        <div>
                          <h4 className="font-semibold capitalize">{dosha}</h4>
                          <p className="text-sm text-muted-foreground">{description.element}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{Math.round(score)}%</div>
                      </div>
                    </div>
                    <Progress
                      value={score}
                      className="h-3"
                      style={{
                        '--progress-background': dosha === 'vata'
                          ? 'rgba(155, 155, 155, 1)'
                          : dosha === 'pitta'
                          ? 'rgba(245, 166, 35, 1)'
                          : 'rgba(63, 166, 115, 1)'
                      } as React.CSSProperties}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Primary Dosha Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{getDoshaIcon(result.primaryDosha)}</span>
                Primary Dosha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 capitalize">{result.primaryDosha}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {DOSHA_DESCRIPTIONS[result.primaryDosha as keyof typeof DOSHA_DESCRIPTIONS].characteristics}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h5 className="font-medium mb-2">Qualities</h5>
                <p className="text-sm text-muted-foreground">
                  {DOSHA_DESCRIPTIONS[result.primaryDosha as keyof typeof DOSHA_DESCRIPTIONS].qualities}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'breakdown' && (
        <div className="space-y-6">
          {/* Top Contributing Traits */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributing Traits</CardTitle>
              <CardDescription>
                These traits had the most influence on your prakruti determination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.topTraits.slice(0, 5).map((item, index) => (
                  <div key={item.trait.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.trait.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.trait.description}</p>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      {item.contribution.toFixed(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Dosha Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(result.scores).map(([dosha, score]) => {
              const colors = DOSHA_COLORS[dosha as keyof typeof DOSHA_COLORS];
              const description = DOSHA_DESCRIPTIONS[dosha as keyof typeof DOSHA_DESCRIPTIONS];
              
              return (
                <Card key={dosha} className={cn("border-2", colors.border)}>
                  <CardHeader className={cn("text-center", colors.bg)}>
                    <div className="text-3xl mb-2">{getDoshaIcon(dosha)}</div>
                    <CardTitle className="capitalize">{dosha}</CardTitle>
                    <div className="text-2xl font-bold">{Math.round(score)}%</div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Element:</strong> {description.element}
                      </div>
                      <div>
                        <strong>Qualities:</strong> {description.qualities}
                      </div>
                      <div>
                        <strong>Characteristics:</strong> {description.characteristics}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Personalized Balancing Tips
              </CardTitle>
              <CardDescription>
                Recommendations to help balance your {result.constitution} constitution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {result.balancingTips.map((tip, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* General Wellness Guidance */}
          <Card>
            <CardHeader>
              <CardTitle>General Wellness Guidance</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-muted-foreground mb-4">
                Remember that your prakruti is your natural constitution - it doesn't change throughout your life. 
                However, your current state (vikriti) can become imbalanced due to lifestyle, diet, stress, and environment.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> These recommendations are general guidelines based on traditional Ayurvedic principles. 
                  For personalized health advice, please consult with a qualified Ayurvedic practitioner or healthcare provider.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
