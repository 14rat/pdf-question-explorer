
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import PDFDropzone from '@/components/pdf/PDFDropzone';
import { usePDF } from '@/contexts/PDFContext';
import { uploadPDF } from '@/services/api';
import { toast } from 'sonner';

const UploadPage = () => {
  const navigate = useNavigate();
  const { setPageContents, setPdfUrl, setIsLoading } = usePDF();

  const handleUpload = async (file: File) => {
    try {
      setIsLoading(true);
      
      // Create a URL for the uploaded file to display in the viewer
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
      
      // Send the file to the backend
      const response = await uploadPDF(file);
      
      // Store the extracted page contents
      setPageContents(response.pageContents);
      
      // Redirect to the viewer page
      navigate('/viewer');
      
      toast.success('PDF processado com sucesso!');
    } catch (error) {
      console.error('Erro ao processar o PDF:', error);
      toast.error('Erro ao processar o PDF. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PDFQuestion
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Faça upload do seu PDF e obtenha insights com IA
          </p>
          
          <div className="mb-12 max-w-lg mx-auto">
            <PDFDropzone onUpload={handleUpload} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-medium mb-2">Faça Upload do PDF</h3>
              <p className="text-sm text-muted-foreground">
                Arraste e solte ou clique para selecionar seu arquivo PDF.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-medium mb-2">Visualize o Conteúdo</h3>
              <p className="text-sm text-muted-foreground">
                Navegue pelo documento e visualize página por página.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-medium mb-2">Obtenha Insights</h3>
              <p className="text-sm text-muted-foreground">
                Gere resumos, perguntas e flashcards baseados no conteúdo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UploadPage;
