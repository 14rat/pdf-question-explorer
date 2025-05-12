
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! A página que você está procurando não existe.
        </p>
        <Button onClick={() => navigate('/')} size="lg">
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
