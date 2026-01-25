import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: ReactNode;
  hideHeaderPadding?: boolean;
}

const Layout = ({ children, hideHeaderPadding = false }: LayoutProps) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${hideHeaderPadding ? '' : 'pt-20 md:pt-24'}`}>
        <PageTransition key={location.pathname}>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
