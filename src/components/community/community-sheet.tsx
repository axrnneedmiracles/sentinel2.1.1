'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Users, MessageCircleWarning, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

interface CommunitySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Report {
    id: number;
    title: string;
    url: string;
    author: string;
    comment: string;
    rating: number;
    time: string;
}

export function CommunitySheet({ open, onOpenChange }: CommunitySheetProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [newReport, setNewReport] = useState({ title: '', url: '', comment: '', rating: 5 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReport(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: number[]) => {
    setNewReport(prev => ({...prev, rating: value[0]}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.title || !newReport.url || !newReport.comment) return;

    const reportToAdd: Report = {
      ...newReport,
      id: Date.now(),
      author: 'You', // In a real app, this would be the logged-in user
      time: 'Just now',
    };
    setReports(prev => [reportToAdd, ...prev]);
    setNewReport({ title: '', url: '', comment: '', rating: 5 });
  };


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-card/30 backdrop-blur-lg border-primary/20">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <Users className="text-primary" />
              Community Reports
            </SheetTitle>
            <SheetDescription>
              See what others are reporting and share your own findings.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4">
            <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg bg-background/50 border border-border/50">
              <h3 className="text-lg font-semibold text-primary-foreground">Submit a Report</h3>
              <Input name="title" placeholder="Report Title (e.g. 'Phishing attempt')" value={newReport.title} onChange={handleInputChange} className="bg-input" required />
              <Input name="url" placeholder="Malicious URL" value={newReport.url} onChange={handleInputChange} className="bg-input" required />
              <Textarea name="comment" placeholder="Describe the scam..." value={newReport.comment} onChange={handleInputChange} className="bg-input" required/>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <Label htmlFor="rating">Your Rating</Label>
                   <span className="text-primary font-bold">{newReport.rating}/10</span>
                </div>
                <Slider id="rating" min={1} max={10} step={1} value={[newReport.rating]} onValueChange={handleRatingChange} />
              </div>
              <Button type="submit" className="w-full">Submit Report</Button>
            </form>
          </div>

          <ScrollArea className="h-[calc(100% - 24rem)] pr-4">
            <div className="py-4 space-y-4">
              {reports.length > 0 ? (
                reports.map((report) => (
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
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No community reports yet. Be the first!</p>
                </div>
              )}
            </div>
          </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
