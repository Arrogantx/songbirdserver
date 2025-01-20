import Anthropic from '@anthropic-ai/sdk';
import { GenerationRequest } from '../types/content';

export class AnthropicService {
  private static client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });

  static async generateContent(params: GenerationRequest): Promise<string> {
    const prompt = `Create ${params.contentType} content for ${params.audience} with a ${params.tone} tone. 
Goal: ${params.goal}
Context: ${params.context}`;

    const message = await this.client.messages.create({
      model: 'claude-2',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    return message.content[0].text;
  }
}
