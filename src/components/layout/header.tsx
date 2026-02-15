
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Scan, Users, Info, Shield } from 'lucide-react';
import ScrambledText from './ScrambledText';

interface HeaderProps {
  onDetectorClick: () => void;
  onCommunityClick: () => void;
  onAboutClick: () => void;
  onAdminClick: () => void;
}

export function Header({ onDetectorClick, onCommunityClick, onAboutClick, onAdminClick }: HeaderProps) {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-target">
        <Image
          src="/logo.gif" 
          alt="Sentinel Scan Logo"
          width={32}
          height={32}
          unoptimized
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
        <Button variant="ghost" size="icon" onClick={onDetectorClick} className="hover:bg-primary/20 hover:text-primary-foreground transition-colors cursor-target">
          <Scan />
          <span className="sr-only">Image Detector</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onCommunityClick} className="hover:bg-primary/20 hover:text-primary-foreground transition-colors cursor-target">
          <Users />
          <span className="sr-only">Community</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onAboutClick} className="hover:bg-primary/20 hover:text-primary-foreground transition-colors cursor-target">
          <Info />
          <span className="sr-only">About Us</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onAdminClick} className="hover:bg-destructive/20 hover:text-destructive transition-colors cursor-target">
          <Shield />
          <span className="sr-only">Admin Panel</span>
        </Button>
      </div>
    </header>
  );
}
