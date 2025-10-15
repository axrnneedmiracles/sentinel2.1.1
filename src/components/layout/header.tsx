'use client';

import { SentinelShield } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { History, Users, Info } from 'lucide-react';
import ScrambledText from './ScrambledText';

interface HeaderProps {
  onHistoryClick: () => void;
  onCommunityClick: () => void;
  onAboutClick: () => void;
}

export function Header({ onHistoryClick, onCommunityClick, onAboutClick }: HeaderProps) {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-target">
        <SentinelShield className="w-8 h-8 text-primary" />
        <ScrambledText
            radius={120}
            duration={1}
            speed={0.3}
            scrambleChars="*!#$:_"
            className="text-2xl font-bold tracking-widest text-primary-foreground"
        >
            SENTINEL SCAN
        </ScrambledText>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onHistoryClick} className="hover:bg-primary/20 hover:text-primary-foreground transition-colors cursor-target">
          <History />
          <span className="sr-only">Scan History</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onCommunityClick} className="hover:bg-primary/20 hover:text-primary-foreground transition-colors cursor-target">
          <Users />
          <span className="sr-only">Community</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onAboutClick} className="hover:bg-primary/20 hover:text-primary-foreground transition-colors cursor-target">
          <Info />
          <span className="sr-only">About Us</span>
        </Button>
      </div>
    </header>
  );
}
