
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Scan } from 'lucide-react';
import { ImageDetectorPage } from './image-detector-page';

interface ImageDetectorSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageDetectorSheet({ open, onOpenChange }: ImageDetectorSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl bg-card/30 backdrop-blur-lg border-primary/20 overflow-y-auto">
        <SheetHeader className="text-left mb-4">
          <SheetTitle className="flex items-center gap-2">
            <Scan className="text-primary" />
            AI Image Detector
          </SheetTitle>
          <SheetDescription>
            Identify AI-generated images using parallel metadata and visual analysis.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-2">
            <ImageDetectorPage />
        </div>
      </SheetContent>
    </Sheet>
  );
}
