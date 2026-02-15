
'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Users, MessageCircleWarning, Star, ShieldCheck, Plus } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { useCommunity } from '@/context/community-context';
import { formatDistanceToNow } from 'date-fns';
import type { ReportFormData } from './community-page';


interface CommunitySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export function CommunitySheet({ open, onOpenChange }: CommunitySheetProps) {
  const { reports, addReport } = useCommunity();
  const [newReport, setNewReport] = useState<ReportFormData>({ title: '', url: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReport(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: number[]) => {
    setNewReport(prev => ({...prev, rating: value[0]}));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.title || !newReport.url || !newReport.comment) return;

    setIsSubmitting(true);
    await addReport(newReport);
    setIsSubmitting(false);
    setShowSuccess(true);
    setNewReport({ title: '', url: '', comment: '', rating: 5 });
  };


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-card/30 backdrop-blur-lg border-primary/20 flex flex-col">
          <SheetHeader className="text-left shrink-0">
            <SheetTitle className="flex items-center gap-2">
              <Users className="text-primary" />
              Community Reports
            </SheetTitle>
            <SheetDescription>
              Moderated findings from the Sentinel Scan community.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4 shrink-0">
            {showSuccess ? (
              <div className="p-6 rounded-lg bg-accent/10 border border-accent/20 text-center space-y-4 animate-in zoom-in-95 duration-500">
                <ShieldCheck className="w-12 h-12 text-accent mx-auto" />
                <div className="space-y-1">
                  <p className="font-bold text-primary-foreground">Report Logged!</p>
                  <p className="text-xs text-muted-foreground">Waiting for administrator review before going live.</p>
                </div>
                <Button size="sm" onClick={() => setShowSuccess(false)} variant="outline" className="w-full cursor-target">
                  Submit Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg bg-background/50 border border-border/50 animate-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Reports are published after admin review.
                </div>
                <Input name="title" placeholder="Report Title" value={newReport.title} onChange={handleInputChange} className="bg-input" required />
                <Input name="url" placeholder="Malicious URL" value={newReport.url} onChange={handleInputChange} className="bg-input" required />
                <Textarea name="comment" placeholder="Describe the scam..." value={newReport.comment} onChange={handleInputChange} className="bg-input" required/>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="rating">Risk Rating</Label>
                    <span className="text-primary font-bold">{newReport.rating}/10</span>
                  </div>
                  <Slider id="rating" min={1} max={10} step={1} value={[newReport.rating]} onValueChange={handleRatingChange} />
                </div>
                <Button type="submit" className="w-full cursor-target" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </form>
            )}
          </div>

          <ScrollArea className="flex-grow pr-4">
            <div className="py-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Live Reports</h4>
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
                          <AvatarFallback className="bg-secondary text-secondary-foreground">{report.author.charAt(0)}</AvatarFallback>
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
                      <p className="text-muted-foreground">{report.time ? formatDistanceToNow(new Date(report.time.toDate()), { addSuffix: true }) : 'Just now'}</p>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-border/50 rounded-lg">
                  <p className="text-muted-foreground">No public reports yet. Help keep the community safe!</p>
                </div>
              )}
            </div>
          </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
