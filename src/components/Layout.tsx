import { useScrollToTop } from '@/hooks/useScrollToTop';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-void flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
