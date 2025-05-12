
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import PDFViewer from '@/components/pdf/PDFViewer';
import PageAnalysisDisplay from '@/components/analysis/PageAnalysisDisplay';
import { usePDF } from '@/contexts/PDFContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { generatePageAnalysis } from '@/services/api';
import { toast } from 'sonner';

const ViewerPage = () => {
  const navigate = useNavigate();
  const { 
    pdfUrl, 
    pageContents, 
    numPages, 
    currentPage, 
    setCurrentPage,
    pageAnalyses,
    addPageAnalysis,
    isLoading,
    setIsLoading
  } = usePDF();
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  // Redirect if no PDF is loaded
  useEffect(() => {
    if (!pdfUrl || pageContents.length === 0) {
      navigate('/');
      toast.error('Por favor, faça upload de um PDF primeiro.');
    }
  }, [pdfUrl, pageContents, navigate]);

  // Get current page content
  const currentPageContent = pageContents.find(
    (content) => content.pageNumber === currentPage
  );

  // Get current page analysis
  const currentPageAnalysis = pageAnalyses.find(
    (analysis) => analysis.pageNumber === currentPage
  );

  const handleGenerateAnalysis = async () => {
    if (!currentPageContent) return;

    setIsGeneratingAnalysis(true);
    try {
      const analysisResponse = await generatePageAnalysis(
        currentPageContent.text,
        currentPage
      );

      addPageAnalysis({
        pageNumber: currentPage,
        summary: analysisResponse.summary,
        questionAnswer: analysisResponse.questionAnswer,
        flashcard: analysisResponse.flashcard,
      });

      toast.success('Análise gerada com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar análise:', error);
      toast.error('Erro ao gerar análise. Tente novamente.');
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  const handlePageChange = (value: string) => {
    setCurrentPage(parseInt(value, 10));
  };

  // Generate page options
  const pageOptions = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Visualizador de PDF</h2>
          <div className="flex items-center space-x-4">
            <Select
              value={currentPage.toString()}
              onValueChange={handlePageChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione uma página" />
              </SelectTrigger>
              <SelectContent>
                {pageOptions.map((page) => (
                  <SelectItem key={page} value={page.toString()}>
                    Página {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => navigate('/insights')}
              variant="outline"
            >
              Ver Insights Completos
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            {pdfUrl && <PDFViewer url={pdfUrl} />}
          </div>

          <div className="flex flex-col space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Texto da Página {currentPage}</h3>
                <div className="bg-muted/30 rounded-md p-4 max-h-64 overflow-y-auto text-sm">
                  {currentPageContent ? (
                    <p className="whitespace-pre-wrap">{currentPageContent.text}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Nenhum texto extraído para esta página.
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={handleGenerateAnalysis}
                    disabled={isGeneratingAnalysis || !currentPageContent?.text}
                    className="w-full max-w-xs"
                  >
                    {isGeneratingAnalysis
                      ? 'Gerando análise...'
                      : currentPageAnalysis
                      ? 'Atualizar Análise'
                      : 'Gerar Análise'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {currentPageAnalysis ? (
              <PageAnalysisDisplay
                analysis={currentPageAnalysis}
                isLoading={isGeneratingAnalysis}
              />
            ) : isGeneratingAnalysis ? (
              <PageAnalysisDisplay
                analysis={{
                  pageNumber: currentPage,
                  summary: '',
                  questionAnswer: { question: '', answer: '' },
                  flashcard: { front: '', back: '' },
                }}
                isLoading={true}
              />
            ) : null}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ViewerPage;
