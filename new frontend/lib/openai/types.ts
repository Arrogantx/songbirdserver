export interface GenerationParams {
  audience: string;
  goal: string;
  tone: string;
  contentType: string;
  context: string;
  model: string;
  includeImage?: boolean;
  imagePrompt?: string;
}

export interface GenerationResponse {
  content: string;
  imageUrl?: string;
}

export interface GenerationError {
  error: string;
}

export type ApiResponse = GenerationResponse | GenerationError;

export function isGenerationError(response: ApiResponse): response is GenerationError {
  return 'error' in response;
}

export type AIModel = {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic';
  capabilities: ('text' | 'image')[];
  description: string;
};