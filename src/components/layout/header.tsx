'use client';

import Image from 'next/image';
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
        {/* 
          Replace this placeholder with the public URL of your GIF from Firebase Storage.
          Make sure the 'width' and 'height' props match your GIF's dimensions.
        */}
        <Image
          src="https://placehold.co/32x32/8400ff/FFFFFF/png?text=LOGO" 
          alt="Sentinel Scan Logo"
          width={32}
          height={32}
          unoptimized // Required for GIFs
        />
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
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden md:inline">Quick Access</span>
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
