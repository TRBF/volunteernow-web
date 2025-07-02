import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { 
  Application, 
  ApplicationQuestion, 
  ApplicationAnswerSubmission,
  ApplicationAnswerResponse,
  ApplicationSubmission,
  ApplicationError,
  ApplicationValidationError 
} from '../types/application';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.volunteernow.ro/api';

class ApplicationService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    });
  }

  private logRequest = (config: AxiosRequestConfig) => {
    console.log('[ApplicationService] Request:', {
      timestamp: new Date().toISOString(),
      method: config.method?.toUpperCase() || 'UNKNOWN',
      url: config.url || 'UNKNOWN',
      headers: config.headers ? {
        ...config.headers,
        Authorization: config.headers.Authorization ? 'Token [REDACTED]' : undefined
      } : {},
      data: config.data
    });
  };

  private logResponse = (response: any) => {
    console.log('[ApplicationService] Response:', {
      timestamp: new Date().toISOString(),
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
  };

  private logError = (error: any) => {
    console.error('[ApplicationService] Error:', {
      timestamp: new Date().toISOString(),
      name: error.name,
      message: error.message,
      code: error.code,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      } : undefined
    });
  };

  private handleError = (error: unknown): ApplicationError => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        code: axiosError.code || 'UNKNOWN_ERROR',
        message: axiosError.message,
        details: axiosError.response?.data
      };
    }
    return {
      code: 'UNKNOWN_ERROR',
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  };

  private validateSubmission = (submission: ApplicationSubmission): ApplicationValidationError[] => {
    const errors: ApplicationValidationError[] = [];
    
    if (!submission.opportunity) {
      errors.push({ field: 'opportunity', message: 'Opportunity ID is required' });
    }
    
    if (!submission.user) {
      errors.push({ field: 'user', message: 'User ID is required' });
    }
    
    if (!submission.answers || submission.answers.length === 0) {
      errors.push({ field: 'answers', message: 'At least one answer is required' });
    }
    
    return errors;
  };

  async getApplicationForm(opportunityId: number): Promise<ApplicationQuestion[]> {
    try {
      const response = await this.api.get<ApplicationQuestion[]>(`/opportunity/${opportunityId}/application-form/`);
      this.logResponse(response);
      return response.data;
    } catch (error) {
      this.logError(error);
      throw this.handleError(error);
    }
  }

  async submitApplication(opportunityId: number, answers: ApplicationAnswerSubmission[]): Promise<Application> {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const submission: ApplicationSubmission = {
        opportunity: opportunityId,
        user: parseInt(userId),
        answers
      };

      const validationErrors = this.validateSubmission(submission);
      if (validationErrors.length > 0) {
        throw {
          code: 'VALIDATION_ERROR',
          message: 'Invalid submission data',
          details: validationErrors
        };
      }

      this.logRequest({
        method: 'post',
        url: `/opportunity/${opportunityId}/apply/`,
        data: submission
      });

      const response = await this.api.post<Application>(`/opportunity/${opportunityId}/apply/`, submission);
      this.logResponse(response);
      return response.data;
    } catch (error) {
      this.logError(error);
      throw this.handleError(error);
    }
  }

  async getUserApplications(): Promise<Application[]> {
    try {
      console.log('[ApplicationService] Fetching user applications...');
      const token = localStorage.getItem('token');
      console.log('[ApplicationService] Token:', token ? 'Present' : 'Missing');
      
      // Debug: Log the full request configuration
      const config = {
        method: 'get',
        url: '/applications/',
        headers: {
          'Authorization': token ? `Token ${token}` : undefined
        }
      };
      console.log('[ApplicationService] Request config:', config);
      
      const response = await this.api.get<Application[]>('/applications/');
      console.log('[ApplicationService] Response data:', response.data);
      this.logResponse(response);
      return response.data;
    } catch (error) {
      console.error('[ApplicationService] Detailed error:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        response: error instanceof Error && 'response' in error ? (error as any).response : undefined
      });
      this.logError(error);
      throw this.handleError(error);
    }
  }

  async getOpportunityApplications(opportunityId: number): Promise<Application[]> {
    try {
      const response = await this.api.get<Application[]>(`/opportunity/${opportunityId}/applications/`);
      this.logResponse(response);
      return response.data;
    } catch (error) {
      this.logError(error);
      throw this.handleError(error);
    }
  }

  async updateApplicationStatus(applicationId: number, status: 'pending' | 'accepted' | 'rejected'): Promise<Application> {
    try {
      const response = await this.api.put<Application>(`/application/${applicationId}/status/`, { status });
      this.logResponse(response);
      return response.data;
    } catch (error) {
      this.logError(error);
      throw this.handleError(error);
    }
  }
}

export const applicationService = new ApplicationService(); 