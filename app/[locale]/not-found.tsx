import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray-100">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-brand-green">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Sayfa Bulunamadı
          </h2>
          <p className="text-brand-gray-600 max-w-md mx-auto">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-brand-green hover:bg-green-800">
            <Link href="/tr">
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfa'ya Dön
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}