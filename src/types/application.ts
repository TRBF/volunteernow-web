export interface ApplicationQuestion {
  id: number;
  opportunity: number;
  question_text: string;
  question_type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox';
  is_required: boolean;
  order: number;
  options?: string[];
}

export interface ApplicationAnswerSubmission {
  question: number;
  answer: string;
}

export interface ApplicationAnswerResponse {
  question: number;
  question_text: string;
  answer: string;
}

export interface Application {
  id: number;
  opportunity: number;
  opportunity_title: string;
  user: number;
  status: 'pending' | 'accepted' | 'rejected';
  submitted_at: string;
  updated_at: string;
  answers: ApplicationAnswerResponse[];
}

export interface ApplicationSubmission {
  opportunity: number;
  user: number;
  answers: ApplicationAnswerSubmission[];
}

export interface ApplicationError {
  code: string;
  message: string;
  details?: any;
}

export interface ApplicationValidationError {
  field: string;
  message: string;
} 