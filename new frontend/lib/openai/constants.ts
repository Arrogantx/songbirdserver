export const OPENAI_CONFIG = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  max_tokens: 1500,
} as const;

export const AI_MODELS: Record<string, AIModel> = {
  'gpt-3.5-turbo': {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    capabilities: ['text'],
    description: 'Fast and efficient for most content generation needs'
  },
  'gpt-4': {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    capabilities: ['text'],
    description: 'Most capable OpenAI model for complex content'
  },
  'dall-e-3': {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    provider: 'openai',
    capabilities: ['image'],
    description: 'High-quality image generation'
  },
  'claude-2': {
    id: 'claude-2',
    name: 'Claude 2',
    provider: 'anthropic',
    capabilities: ['text'],
    description: 'Anthropic\'s advanced language model'
  }
} as const;

export const GENERATION_ERRORS = {
  MISSING_API_KEY: 'OpenAI API key not configured',
  MISSING_FIELDS: 'Please fill in all required fields',
  MISSING_CONTEXT: 'Please provide context for your content',
  NO_CONTENT: 'No content was generated',
  INVALID_CONTENT: 'Generated content did not meet quality standards',
  UNEXPECTED: 'An unexpected error occurred while generating content',
  RATE_LIMIT: 'Too many requests. Please try again later',
  INVALID_REQUEST: 'Invalid request parameters',
  NETWORK_ERROR: 'Network error occurred. Please check your connection',
  API_ERROR: 'Error communicating with AI provider',
  PARSE_ERROR: 'Error processing the response',
} as const;