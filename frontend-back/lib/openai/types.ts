export interface GenerationParams {
  audience?: string;
  goal?: string;
  tone?: string;
  contentType?: string;
  context?: string;
  additionalContext?: string;
}


export interface GenerationError {
  error: string;
}

export type ApiResponse = GenerationResponse | GenerationError;

export function isGenerationError(response: ApiResponse): response is GenerationError {
  return 'error' in response;
}

export interface GenerationResponse {
  data: string;
}
