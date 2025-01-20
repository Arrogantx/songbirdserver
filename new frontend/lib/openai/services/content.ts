import { openai } from '../config';
import { GenerationParams, GenerationResponse } from '../types';
import { createContentPrompt } from '../prompts/generator';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export class ContentService {
  static async generateContent(params: GenerationParams): Promise<GenerationResponse> {
    try {
      let content: string;
      let imageUrl: string | undefined;

      // Generate text content
      if (params.model.startsWith('gpt')) {
        content = await this.generateWithOpenAI(params);
      } else if (params.model === 'claude-2') {
        content = await this.generateWithClaude(params);
      } else {
        throw new Error('Invalid model selected');
      }

      // Generate image if requested
      if (params.includeImage && params.imagePrompt) {
        imageUrl = await this.generateImage(params.imagePrompt);
      }

      return { content, imageUrl };
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }

  private static async generateWithOpenAI(params: GenerationParams): Promise<string> {
    const systemPrompt = `You are an expert content creator specializing in ${params.contentType} content.
Your task is to create highly specific content that:
1. Directly addresses the ${params.audience} audience
2. Achieves the goal to ${params.goal}
3. Maintains a ${params.tone} tone throughout
4. Incorporates all provided context and details`;

    const userPrompt = createContentPrompt(params);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: params.model,
      temperature: 0.7,
      max_tokens: 1500,
    });

    const generatedContent = completion.choices[0]?.message?.content;
    if (!generatedContent) throw new Error('No content generated');
    return generatedContent;
  }

  private static async generateWithClaude(params: GenerationParams): Promise<string> {
    const prompt = createContentPrompt(params);
    
    const message = await anthropic.messages.create({
      model: 'claude-2',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const generatedContent = message.content[0].text;
    if (!generatedContent) throw new Error('No content generated');
    return generatedContent;
  }

  private static async generateImage(prompt: string): Promise<string> {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) throw new Error('No image generated');
    return imageUrl;
  }
}