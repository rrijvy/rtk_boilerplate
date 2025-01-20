export interface PredictionRequestSchema {
  story_id: string;
  prompt: string;
}

export interface PredictionResponseSchema {
  id: string;
  model: string;
  version: string;
  input: PredictionRequestSchema;
  logs: string;
  output?: string;
  data_removed: boolean;
  error?: string;
  status: string;
  created_at: string;
  urls: {
    cancel: string;
    get: string;
  };
}
