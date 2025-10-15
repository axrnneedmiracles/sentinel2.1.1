
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BackgroundAnimation } from '@/components/background-animation';
import { Header } from '@/components/layout/header';
import { ScanForm } from '@/components/scan/scan-form';
import { ScanResultDisplay } from '@/components/scan/scan-result';
import { HistorySheet } from '@/components/history/history-sheet';
import { CommunitySheet } from '@/components/community/community-sheet';
import { AboutSheet } from '@/components/about/about-sheet';
import { scanMessage } from '@/lib/actions';
import type { ScanResult } from '@/lib/types';
import { useHistory } from '@/hooks/use-history';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import MagicBento from '@/components/ui/magic-bento';
import { HistoryPage } from '@/components/history/history-page';
import { CommunityPage } from '@/components/community/community-page';
import { AboutPage } from '@/components/about/about-page';

type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';
type View = 'home' | 'history' | 'community' | 'about';

export default function Home() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { addHistoryItem } = useHistory();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<View>('home');


  const handleScan = async (text: string) => {
    if (!text.trim()) return;

    setStatus('scanning');
    setResult(null);

    const scanResult = await scanMessage(text);
    
    if (scanResult.error) {
      toast({
        variant: 'destructive',
        title: 'Scan Error',
        description: scanResult.error,
      });
      setStatus('error');
    } else {
      setResult(scanResult);
      addHistoryItem(scanResult);
      setStatus('success');
    }
  };
  
  const getBackgroundColor = () => {
    if (status === 'success' && result) {
      return result.isMalicious
        ? 'bg-destructive/20'
        : 'bg-green-500/20';
    }
    return 'bg-transparent';
  };

  const handleReset = () => {
    setStatus('idle');
    setResult(null);
    setCurrentView('home');
  };
  
  const renderContent = () => {
    switch (currentView) {
      case 'history':
        return <HistoryPage />;
      case 'community':
        return <CommunityPage />;
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return (
            <>
              {status === 'idle' ? (
                <>
                  <div className="relative w-full max-w-3xl text-center space-y-2">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Image
                          src="/logo.gif"
                          alt="Background Logo"
                          width={150}
                          height={150}
                          unoptimized
                          className="opacity-10"
                        />
                      </div>
                      <h2 className="relative text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent py-2 bg-[length:200%_auto] animate-background-pan" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--accent) / 0.5)' }}>SENTINEL SCAN</h2>
                      <p className="relative text-lg md:text-xl text-muted-foreground">
                          GRAVEYARD OF SCAMMERS
                      </p>
                  </div>
                  <ScanForm onScan={handleScan} loading={status === 'scanning'} />
                </>
              ) : (
                 <ScanForm onScan={handleScan} loading={status === 'scanning'} />
              )}
    
              <ScanResultDisplay result={result} status={status} />

              {status === 'idle' && <MagicBento onCardClick={setCurrentView} />}
            </>
        );
    }
  }

  const showHomeButton = currentView !== 'home' || (status !== 'idle' && status !== 'scanning');

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-1000 ${getBackgroundColor()}`}>
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          onHistoryClick={() => setHistoryOpen(true)} 
          onCommunityClick={() => setCommunityOpen(true)} 
          onAboutClick={() => setAboutOpen(true)}
        />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-start gap-12">
          {showHomeButton && (
            <div className="w-full max-w-3xl flex justify-start">
                <Button onClick={handleReset} variant="outline" className="bg-card/50 backdrop-blur-sm cursor-target">
                    <HomeIcon className="mr-2 h-4 w-4"/>
                    Home
                </Button>
            </div>
          )}
          {renderContent()}
        </main>
        <footer className="text-center p-4 text-muted-foreground text-sm">
          POWERED BY AXRN. Stay Safe Online.
        </footer>
      </div>

      <HistorySheet open={historyOpen} onOpenChange={setHistoryOpen} />
      <CommunitySheet open={communityOpen} onOpenChange={setCommunityOpen} />
      <AboutSheet open={aboutOpen} onOpenChange={setAboutOpen} />
    </div>
  );
}
