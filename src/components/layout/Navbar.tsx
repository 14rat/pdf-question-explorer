
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePDF } from "@/contexts/PDFContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { fileName, pdfUrl } = usePDF();

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 
          className="text-xl md:text-2xl font-bold text-white cursor-pointer" 
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
              className="hidden sm:flex text-white hover:bg-white/20"
            >
              Visualizar PDF
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate("/insights")}
              className="hidden sm:flex text-white hover:bg-white/20"
            >
              Insights
            </Button>
          </>
        )}
        
        {fileName && (
          <div className="text-sm text-white/80 hidden md:block">
            Arquivo: {fileName}
          </div>
        )}
        
        <Button 
          variant="secondary" 
          onClick={() => navigate("/")}
          className="bg-white text-purple-700 hover:bg-purple-100"
        >
          Upload PDF
        </Button>
      </div>
    </nav>
  );
}
