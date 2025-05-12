
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageAnalysis } from '@/contexts/PDFContext';
import { Separator } from '@/components/ui/separator';

interface PageAnalysisDisplayProps {
  analysis: PageAnalysis;
  isLoading?: boolean;
}

const PageAnalysisDisplay = ({ analysis, isLoading = false }: PageAnalysisDisplayProps) => {
  return (
    <div className="space-y-6 w-full">
      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Página</CardTitle>
          <CardDescription>Pontos principais desta página</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          {isLoading ? (
            <div className="animate-pulse h-20 bg-muted rounded" />
          ) : (
            <p>{analysis.summary}</p>
          )}
        </CardContent>
      </Card>

      {/* Question & Answer Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pergunta e Resposta</CardTitle>
          <CardDescription>Baseado no conteúdo da página</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          {isLoading ? (
            <div className="space-y-2">
              <div className="animate-pulse h-6 bg-muted rounded" />
              <div className="animate-pulse h-16 bg-muted rounded mt-2" />
            </div>
          ) : (
            <>
              <h3 className="font-medium mb-2">{analysis.questionAnswer.question}</h3>
              <p className="text-muted-foreground">{analysis.questionAnswer.answer}</p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Flashcard Section */}
      <Card>
        <CardHeader>
          <CardTitle>Flashcard</CardTitle>
          <CardDescription>Para ajudar na memorização</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse h-24 bg-muted rounded" />
          ) : (
            <div className="border rounded-md p-3">
              <p className="font-medium">{analysis.flashcard.front}</p>
              <Separator className="my-2" />
              <p className="text-muted-foreground">{analysis.flashcard.back}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageAnalysisDisplay;
