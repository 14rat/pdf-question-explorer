
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-blue-950">
      <div className="text-center bg-white/80 backdrop-blur-sm p-10 rounded-xl shadow-xl border border-purple-200">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">
          Oops! A página que você está procurando não existe.
        </p>
        <Button onClick={() => navigate('/')} size="lg" className="bg-purple-600 hover:bg-purple-700">
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
