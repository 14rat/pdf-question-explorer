
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import GlobalInsightsDisplay from '@/components/analysis/GlobalInsightsDisplay';
import { usePDF } from '@/contexts/PDFContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { generateGlobalInsights } from '@/services/api';
import { toast } from 'sonner';

const InsightsPage = () => {
  const navigate = useNavigate();
  const { 
    pdfUrl, 
    pageContents, 
    globalInsights, 
    setGlobalInsights, 
    fileName 
  } = usePDF();
  const [isGenerating, setIsGenerating] = useState(false);

  // Redirect if no PDF is loaded
  useEffect(() => {
    if (!pdfUrl || pageContents.length === 0) {
      navigate('/');
      toast.error('Por favor, faça upload de um PDF primeiro.');
    }
  }, [pdfUrl, pageContents, navigate]);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    try {
      // Combine all page text
      const fullText = pageContents
        .sort((a, b) => a.pageNumber - b.pageNumber)
        .map(page => page.text)
        .join('\n\n--- Página Nova ---\n\n');
      
      const insights = await generateGlobalInsights(fullText);
      setGlobalInsights(insights);
      
      toast.success('Insights gerados com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar insights:', error);
      toast.error('Erro ao gerar insights. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">
            Insights do Documento
            {fileName && <span className="text-muted-foreground text-lg ml-2">({fileName})</span>}
          </h2>
          <Button onClick={() => navigate('/viewer')} variant="outline">
            Voltar ao Visualizador
          </Button>
        </div>
        
        <Separator className="mb-8" />
        
        {!globalInsights && !isGenerating ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">
              Não há insights gerados para este documento
            </h3>
            <p className="text-muted-foreground mb-6">
              Clique no botão abaixo para gerar um resumo completo, perguntas e respostas, 
              e flashcards baseados em todo o conteúdo do documento.
            </p>
            <Button 
              onClick={handleGenerateInsights} 
              size="lg" 
              className="px-8"
            >
              Gerar Insights Completos
            </Button>
          </div>
        ) : (
          <>
            {globalInsights && (
              <GlobalInsightsDisplay insights={globalInsights} isLoading={isGenerating} />
            )}
            
            {isGenerating && !globalInsights && (
              <div className="text-center py-8">
                <p className="text-lg mb-4">Gerando insights completos...</p>
                <p className="text-sm text-muted-foreground">
                  Isso pode levar alguns segundos dependendo do tamanho do documento.
                </p>
                <GlobalInsightsDisplay 
                  insights={{
                    summary: '',
                    questionsAnswers: Array(5).fill({ question: '', answer: '' }),
                    flashcards: Array(5).fill({ front: '', back: '' })
                  }} 
                  isLoading={true} 
                />
              </div>
            )}
            
            {globalInsights && (
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={handleGenerateInsights}
                  variant="outline"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Gerando...' : 'Regenerar Insights'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default InsightsPage;
