
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePDF } from "@/contexts/PDFContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { fileName, pdfUrl } = usePDF();

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 
          className="text-xl md:text-2xl font-bold text-primary cursor-pointer" 
          onClick={() => navigate("/")}
        >
          PDFQuestion
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {pdfUrl && (
          <>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/viewer")}
              className="hidden sm:flex"
            >
              Visualizar PDF
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate("/insights")}
              className="hidden sm:flex"
            >
              Insights
            </Button>
          </>
        )}
        
        {fileName && (
          <div className="text-sm text-muted-foreground hidden md:block">
            Arquivo: {fileName}
          </div>
        )}
        
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
        >
          Upload PDF
        </Button>
      </div>
    </nav>
  );
}
