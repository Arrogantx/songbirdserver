"use client";

import { useState } from "react";
import { WizardForm } from "@/components/content-generator/wizard-form";
import { ContentOutput } from "@/components/content-generator/output";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { useContentGeneration } from "@/hooks/use-content-generation";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { SignupPrompt } from "@/components/marketing/signup-prompt";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MessageSquare, Image, Video, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const apps = [
  {
    id: "content",
    name: "Content Creator",
    icon: MessageSquare,
    description: "Generate compelling written content for your campaigns"
  },
  {
    id: "images",
    name: "Image Generator",
    icon: Image,
    description: "Create custom images for your communications"
  },
  {
    id: "video",
    name: "Video Creator",
    icon: Video,
    description: "Produce engaging video content"
  },
  {
    id: "documents",
    name: "Document Builder",
    icon: FileText,
    description: "Create professional documents and reports"
  }
];

export default function GeneratorPage() {
  const { generatedContent, isGenerating, handleGenerate } = useContentGeneration();
  const { rateLimit, isLoading: isLoadingRateLimit, isLimited } = useRateLimit();
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [activeApp, setActiveApp] = useState("content");

  const handleGenerateContent = async (formData: any) => {
    await handleGenerate(formData);
    const hasShownPrompt = localStorage.getItem("hasShownSignupPrompt");
    if (!hasShownPrompt) {
      setShowSignupPrompt(true);
      localStorage.setItem("hasShownSignupPrompt", "true");
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedGrid />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 text-blue-500">
            Content Launcher
          </h1>
          <p className="text-muted-foreground">
            Create compelling content tailored to your advocacy goals and audience.
          </p>
        </motion.div>

        <Tabs defaultValue="content" className="w-full max-w-4xl mx-auto mb-8">
          <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <TabsTrigger
                  key={app.id}
                  value={app.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex flex-col items-center gap-2 p-6 relative border border-border hover:bg-accent"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{app.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="content" className="mt-8">
            {isLoadingRateLimit ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : isLimited ? (
              <Alert className="max-w-2xl mx-auto mb-8">
                <AlertDescription>
                  You've reached your generation limit. Sign up for a free account to get more generations!
                </AlertDescription>
              </Alert>
            ) : (
              <div className="max-w-4xl mx-auto">
                <WizardForm 
                  onGenerate={handleGenerateContent} 
                  isGenerating={isGenerating} 
                />
                
                {generatedContent && !isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12"
                  >
                    <ContentOutput content={generatedContent} />
                  </motion.div>
                )}
              </div>
            )}
          </TabsContent>

          {["images", "video", "documents"].map((appId) => (
            <TabsContent key={appId} value={appId} className="mt-8">
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  This feature is currently in development. Stay tuned for updates!
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <SignupPrompt 
        showDialog={showSignupPrompt} 
        onClose={() => setShowSignupPrompt(false)} 
      />
    </div>
  );
}