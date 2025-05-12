
import React, { createContext, useContext, useState, ReactNode } from "react";

export type PageContent = {
  pageNumber: number;
  text: string;
};

export type PageAnalysis = {
  pageNumber: number;
  summary: string;
  questionAnswer: {
    question: string;
    answer: string;
  };
  flashcard: {
    front: string;
    back: string;
  };
};

export type GlobalInsights = {
  summary: string;
  questionsAnswers: Array<{
    question: string;
    answer: string;
  }>;
  flashcards: Array<{
    front: string;
    back: string;
  }>;
};

interface PDFContextType {
  fileName: string;
  setFileName: (name: string) => void;
  pdfUrl: string;
  setPdfUrl: (url: string) => void;
  numPages: number;
  setNumPages: (num: number) => void;
  pageContents: PageContent[];
  setPageContents: (contents: PageContent[]) => void;
  pageAnalyses: PageAnalysis[];
  setPageAnalyses: (analyses: PageAnalysis[]) => void;
  addPageAnalysis: (analysis: PageAnalysis) => void;
  globalInsights: GlobalInsights | null;
  setGlobalInsights: (insights: GlobalInsights | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const PDFProvider = ({ children }: { children: ReactNode }) => {
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [pageAnalyses, setPageAnalyses] = useState<PageAnalysis[]>([]);
  const [globalInsights, setGlobalInsights] = useState<GlobalInsights | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addPageAnalysis = (analysis: PageAnalysis) => {
    setPageAnalyses(prev => {
      // Check if analysis for this page already exists
      const index = prev.findIndex(item => item.pageNumber === analysis.pageNumber);
      
      if (index !== -1) {
        // Replace existing analysis
        const updated = [...prev];
        updated[index] = analysis;
        return updated;
      } else {
        // Add new analysis
        return [...prev, analysis];
      }
    });
  };

  return (
    <PDFContext.Provider
      value={{
        fileName,
        setFileName,
        pdfUrl,
        setPdfUrl,
        numPages,
        setNumPages,
        pageContents,
        setPageContents,
        pageAnalyses,
        setPageAnalyses,
        addPageAnalysis,
        globalInsights,
        setGlobalInsights,
        currentPage,
        setCurrentPage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};

export const usePDF = () => {
  const context = useContext(PDFContext);
  if (context === undefined) {
    throw new Error("usePDF must be used within a PDFProvider");
  }
  return context;
};
