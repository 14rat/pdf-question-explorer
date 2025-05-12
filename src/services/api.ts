
import axios from 'axios';
import { PageContent } from '@/contexts/PDFContext';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PageAnalysisResponse {
  summary: string;
  questionAnswer: {
    question: string;
    answer: string;
  };
  flashcard: {
    front: string;
    back: string;
  };
}

export interface GlobalInsightsResponse {
  summary: string;
  questionsAnswers: Array<{
    question: string;
    answer: string;
  }>;
  flashcards: Array<{
    front: string;
    back: string;
  }>;
}

export interface ProcessPDFResponse {
  pageContents: PageContent[];
}

export const uploadPDF = async (file: File): Promise<ProcessPDFResponse> => {
  const formData = new FormData();
  formData.append('pdf', file);
  
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const generatePageAnalysis = async (
  text: string,
  pageNumber: number
): Promise<PageAnalysisResponse> => {
  const response = await api.post('/analyze', {
    text,
    mode: 'page',
    pageNumber,
  });
  
  return response.data;
};

export const generateGlobalInsights = async (
  fullText: string
): Promise<GlobalInsightsResponse> => {
  const response = await api.post('/analyze', {
    text: fullText,
    mode: 'global',
  });
  
  return response.data;
};

export default api;
