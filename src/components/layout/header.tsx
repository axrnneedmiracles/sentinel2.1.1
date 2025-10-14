'use client';

import { SentinelShield } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { History, Users } from 'lucide-react';

interface HeaderProps {
  onHistoryClick: () => void;
  onCommunityClick: () => void;
}

export function Header({ onHistoryClick, onCommunityClick }: HeaderProps) {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <SentinelShield className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-wider text-primary-foreground">
          SENTINEL SCAN
        </h1>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onHistoryClick} className="hover:bg-primary/20 hover:text-primary-foreground transition-colors">
          <History />
          <span className="sr-only">Scan History</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onCommunityClick} className="hover:bg-primary/20 hover:text-primary-foreground transition-colors">
          <Users />
          <span className="sr-only">Community</span>
        </Button>
      </div>
    </header>
  );
}
