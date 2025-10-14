'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Star, Users, MessageCircleWarning, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface CommunitySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockReports = [
  {
    id: 1,
    title: '"Free Crypto Airdrop!"',
    url: 'claim-your-tokens.io',
    author: 'U1',
    comment: "Classic wallet drainer scam. Asks you to connect to 'claim' free tokens but instead adds a malicious contract that drains your funds. Do not interact!",
    rating: 1,
    time: '2 hours ago',
  },
  {
    id: 2,
    title: '"Package Delivery Fee Required"',
    url: 'usps-track-fees.com',
    author: 'U2',
    comment: "Got an SMS about a package needing a small fee for redelivery. The site looks real but it's phishing for credit card details.",
    rating: 2,
    time: '8 hours ago',
  },
  {
    id: 3,
    title: '"Your Account is Suspended"',
    url: 'verify-my-bank-account.net',
    author: 'U3',
    comment: "Email claiming to be from my bank. The link goes to a fake login page to steal credentials. Always check the URL!",
    rating: 1,
    time: '1 day ago',
  },
];

export function CommunitySheet({ open, onOpenChange }: CommunitySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-card/30 backdrop-blur-lg border-primary/20">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <Users className="text-primary" />
              Community Reports
            </SheetTitle>
            <SheetDescription>
              See what others are reporting. Your feedback helps protect everyone.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100%-8rem)] pr-4">
            <div className="py-4 space-y-4">
              {mockReports.map((report) => (
                <Card key={report.id} className="bg-background/50 border-border/50">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                          <MessageCircleWarning className="text-destructive w-5 h-5" />
                           {report.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground break-all">{report.url}</p>
                      </div>
                      <Avatar>
                        <AvatarFallback className="bg-secondary text-secondary-foreground">{report.author}</AvatarFallback>
                      </Avatar>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">“{report.comment}”</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1 text-destructive font-bold">
                      <Star className="w-4 h-4 fill-destructive text-destructive" />
                      <span>{report.rating}/10 Rating</span>
                    </div>
                    <p className="text-muted-foreground">{report.time}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-card/30 backdrop-blur-lg border-t border-primary/20">
             <Button className="w-full" disabled>Submit a Report (Coming Soon)</Button>
           </div>
      </SheetContent>
    </Sheet>
  );
}
