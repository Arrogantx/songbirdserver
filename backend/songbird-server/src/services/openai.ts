import OpenAI from 'openai';
import { GenerationRequest } from '../types/content';

export class OpenAIService {
  private static client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  static async generateContent(params: GenerationRequest): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: params.model,
      messages: [
        {
          role: "system",
          content: `You are an expert content creator specializing in ${params.contentType}.`
        },
        {
          role: "user",
          content: `Create ${params.contentType} content for ${params.audience} with a ${params.tone} tone.
Goal: ${params.goal}
Context: ${params.context}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return completion.choices[0]?.message?.content || '';
  }

  static async generateImage(prompt: string): Promise<string> {
    const response = await this.client.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    });

    return response.data[0]?.url || '';
  }
}
