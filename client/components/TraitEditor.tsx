import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Edit3 } from 'lucide-react';
import { TRAIT_OPTIONS, AYURVEDIC_TRAITS, type UserResponse } from '@/lib/ayurveda';

interface TraitEditorProps {
  userResponses: UserResponse[];
  onUpdateResponses: (responses: UserResponse[]) => void;
}

export function TraitEditor({ userResponses, onUpdateResponses }: TraitEditorProps) {
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleEditTrait = (traitId: string, currentValue: string) => {
    setSelectedTrait(traitId);
    setSelectedValue(currentValue);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!selectedTrait || !selectedValue) return;

    const updatedResponses = userResponses.map(response => 
      response.traitId === selectedTrait 
        ? { ...response, value: selectedValue }
        : response
    );

    onUpdateResponses(updatedResponses);
    setIsOpen(false);
    setSelectedTrait(null);
    setSelectedValue('');
  };

  const getTraitDisplayName = (traitId: string) => {
    const trait = AYURVEDIC_TRAITS.find(t => t.id === traitId);
    return trait?.name || traitId;
  };

  const getTraitOptions = (traitId: string) => {
    const options = TRAIT_OPTIONS[traitId as keyof typeof TRAIT_OPTIONS];
    if (!options) return [];
    
    return Object.entries(options).flatMap(([dosha, values]) => 
      values.map(value => ({ dosha, value }))
    );
  };

  if (userResponses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No traits detected yet. Start sharing about yourself!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">Detected Traits</h4>
      <div className="grid gap-2">
        {userResponses.map((response, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-sm">{getTraitDisplayName(response.traitId)}</div>
              <div className="text-xs text-muted-foreground">Value: {response.value}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {Math.round(response.confidence * 100)}%
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditTrait(response.traitId, response.value)}
                className="h-8 w-8 p-0"
              >
                <Edit3 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Trait</DialogTitle>
            <DialogDescription>
              Adjust the interpretation for {selectedTrait ? getTraitDisplayName(selectedTrait) : ''}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTrait && (
            <div className="space-y-4">
              <Label>Select the option that best describes you:</Label>
              <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
                {getTraitOptions(selectedTrait).map(({ dosha, value }, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="capitalize text-xs text-muted-foreground">{dosha}:</span>
                        <span>{value}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!selectedValue}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
