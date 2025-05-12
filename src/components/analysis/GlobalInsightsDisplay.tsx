
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlobalInsights } from '@/contexts/PDFContext';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GlobalInsightsDisplayProps {
  insights: GlobalInsights;
  isLoading?: boolean;
}

const GlobalInsightsDisplay = ({ insights, isLoading = false }: GlobalInsightsDisplayProps) => {
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto pb-12">
      {/* Summary Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Resumo Completo</CardTitle>
          <CardDescription>Visão geral do documento</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse h-28 bg-muted rounded" />
          ) : (
            <div className="prose max-w-none">
              <p>{insights.summary}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Questions & Answers Section */}
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4">
          <TabsTrigger value="questions">Perguntas & Respostas</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Perguntas & Respostas</CardTitle>
              <CardDescription>
                5 perguntas principais baseadas no conteúdo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-6 bg-muted rounded" />
                    <div className="h-12 bg-muted rounded" />
                  </div>
                ))
              ) : (
                insights.questionsAnswers.map((qa, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">{qa.question}</h3>
                    <p className="text-sm text-muted-foreground">{qa.answer}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="flashcards">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Flashcards</CardTitle>
              <CardDescription>Para ajudar na memorização do conteúdo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse h-24 bg-muted rounded" />
                ))
              ) : (
                insights.flashcards.map((flashcard, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p className="font-medium">{flashcard.front}</p>
                    <Separator className="my-2" />
                    <p className="text-muted-foreground">{flashcard.back}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalInsightsDisplay;
