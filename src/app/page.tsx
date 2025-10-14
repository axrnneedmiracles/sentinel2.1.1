'use client';

import { useState } from 'react';
import { BackgroundAnimation } from '@/components/background-animation';
import { Header } from '@/components/layout/header';
import { ScanForm } from '@/components/scan/scan-form';
import { ScanResultDisplay } from '@/components/scan/scan-result';
import { HistorySheet } from '@/components/history/history-sheet';
import { CommunitySheet } from '@/components/community/community-sheet';
import { scanMessage } from '@/lib/actions';
import type { ScanResult } from '@/lib/types';
import { useHistory } from '@/hooks/use-history';
import { useToast } from '@/hooks/use-toast';

type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';

export default function Home() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const { addHistoryItem } = useHistory();
  const { toast } = useToast();

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

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-1000 ${getBackgroundColor()}`}>
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          onHistoryClick={() => setHistoryOpen(true)} 
          onCommunityClick={() => setCommunityOpen(true)} 
        />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-start gap-8">
          <div className="w-full max-w-3xl text-center space-y-2">
              <h2 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-2 bg-[length:200%_auto] animate-background-pan" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--accent) / 0.5)' }}>SENTINEL SCAN</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                  Paste the message here.
              </p>
          </div>
          <ScanForm onScan={handleScan} loading={status === 'scanning'} />
          <ScanResultDisplay result={result} status={status} />
        </main>
        <footer className="text-center p-4 text-muted-foreground text-sm">
          POWERED BY AXRN. Stay Safe Online.
        </footer>
      </div>

      <HistorySheet open={historyOpen} onOpenChange={setHistoryOpen} />
      <CommunitySheet open={communityOpen} onOpenChange={setCommunityOpen} />
    </div>
  );
}
