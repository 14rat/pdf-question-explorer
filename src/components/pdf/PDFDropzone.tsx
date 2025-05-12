
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { usePDF } from '@/contexts/PDFContext';
import { toast } from 'sonner';

interface PDFDropzoneProps {
  onUpload: (file: File) => void;
}

const PDFDropzone = ({ onUpload }: PDFDropzoneProps) => {
  const { setFileName } = usePDF();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      toast.error('Por favor, selecione um arquivo PDF válido.');
      return;
    }
    
    setUploading(true);
    setProgress(0);
    setFileName(file.name);
    setUploadedFile(file);
    
    // Simulate progress for better UX
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    
    // Finish after a short delay
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
      onUpload(file);
    }, 1500);
    
  }, [setFileName, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-primary hover:bg-secondary/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 bg-secondary rounded-full">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">
                {isDragActive
                  ? 'Solte o PDF aqui...'
                  : 'Arraste e solte seu PDF aqui, ou clique para selecionar'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Apenas arquivos PDF são aceitos
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded">
              <File className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          {uploading ? (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                {progress === 100 ? 'Processando arquivo...' : 'Enviando arquivo...'}
              </p>
            </div>
          ) : (
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUploadedFile(null);
                  setFileName('');
                }}
              >
                Trocar arquivo
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFDropzone;
