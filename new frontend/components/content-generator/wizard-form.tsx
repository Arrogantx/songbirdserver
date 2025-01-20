"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { WizardStepComponent } from "./wizard/wizard-step";
import { useWizard } from "./wizard/use-wizard";
import { StepIndicator } from "./step-indicator";
import { GenerationParams } from "@/lib/openai/types";
import { AI_MODELS } from "@/lib/openai/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WizardFormProps {
  onGenerate: (data: GenerationParams) => void;
  isGenerating: boolean;
}

export function WizardForm({ onGenerate, isGenerating }: WizardFormProps) {
  const {
    currentStep,
    formData,
    handleSelect,
    handleBack,
    isComplete,
    totalSteps,
    currentStepData,
  } = useWizard();

  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [includeImage, setIncludeImage] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');

  const handleGenerateClick = () => {
    if (isComplete && !isGenerating) {
      onGenerate({
        ...formData as GenerationParams,
        model: selectedModel,
        includeImage,
        imagePrompt: includeImage ? imagePrompt : undefined
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        labels={Array(totalSteps).fill("")}
      />

      <div className="bg-card border rounded-lg p-6 mb-8">
        <div className="mb-6 space-y-4">
          <div className="space-y-2">
            <Label>Select AI Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI model" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(AI_MODELS)
                  .filter(model => model.capabilities.includes('text'))
                  .map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name} - {model.description}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="include-image"
              checked={includeImage}
              onCheckedChange={setIncludeImage}
            />
            <Label htmlFor="include-image">Include generated image</Label>
          </div>

          {includeImage && (
            <div className="space-y-2">
              <Label>Image Prompt</Label>
              <Textarea
                placeholder="Describe the image you want to generate..."
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
              />
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <WizardStepComponent
            key={currentStepData.id}
            step={currentStepData}
            value={formData[currentStepData.id] || ""}
            onSelect={handleSelect}
            showGenerateButton={currentStepData.id === 'context' && !!formData.context?.trim()}
            onGenerate={handleGenerateClick}
            isGenerating={isGenerating}
          />
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0 || isGenerating}
          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    </div>
  );
}