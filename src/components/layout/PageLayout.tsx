
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from '@/components/ui/sonner';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-blue-950">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
