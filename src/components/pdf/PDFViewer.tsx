
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePDF } from '@/contexts/PDFContext';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set the workerSrc for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

const PDFViewer = ({ url }: PDFViewerProps) => {
  const { numPages, setNumPages, currentPage, setCurrentPage } = usePDF();
  const [pageWidth, setPageWidth] = useState<number>(800);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const updatePageWidth = () => {
      // Adjust the PDF width based on screen size
      const viewerContainer = document.getElementById('pdf-viewer-container');
      if (viewerContainer) {
        const containerWidth = viewerContainer.offsetWidth;
        const maxWidth = 800; // Maximum PDF width
        const newWidth = Math.min(containerWidth - 32, maxWidth);
        setPageWidth(newWidth);
      }
    };

    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    
    return () => {
      window.removeEventListener('resize', updatePageWidth);
    };
  }, []);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const nextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center" id="pdf-viewer-container">
      <div className="relative bg-white rounded-lg shadow-md my-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <Document
          file={url}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
          className="max-w-full"
        >
          <Page
            pageNumber={currentPage}
            width={pageWidth}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button 
          onClick={prevPage} 
          disabled={currentPage <= 1}
          variant="outline"
        >
          Anterior
        </Button>
        <span className="text-sm">
          Página {currentPage} de {numPages || '?'}
        </span>
        <Button 
          onClick={nextPage} 
          disabled={currentPage >= numPages}
          variant="outline"
        >
          Próxima
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
