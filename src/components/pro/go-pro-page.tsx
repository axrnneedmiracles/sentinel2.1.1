
'use client';

import { Star, ShieldCheck, Zap, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const features = [
  {
    icon: <Zap className="text-primary" />,
    title: 'Real-time Browser Protection',
    description: 'A browser extension that automatically scans links on any webpage before you click.',
  },
  {
    icon: <Bot className="text-primary" />,
    title: 'Advanced AI Analysis',
    description: 'Get deeper insights, including historical threat data and analysis of linked files.',
  },
  {
    icon: <ShieldCheck className="text-primary" />,
    title: 'Proactive Threat Alerts',
    description: 'Receive notifications about new, widespread threats and scams as they emerge.',
  },
];

export function GoProPage() {
  return (
    <Card className="w-full max-w-3xl bg-card/30 backdrop-blur-lg border-primary/20 animate-in fade-in zoom-in-95">
      <CardHeader className="text-center items-center space-y-4">
        <div className="flex justify-center items-center">
            <Star className="text-yellow-400 w-12 h-12" fill="currentColor" />
        </div>
        <CardTitle className="text-3xl font-extrabold text-primary-foreground">Sentinel Pro</CardTitle>
        <CardDescription className="text-lg text-muted-foreground max-w-md">
          Upgrade to unlock advanced protection and gain peace of mind with our most powerful security features.
        </CardDescription>
        <Badge>Coming Soon</Badge>
      </CardHeader>
      <CardContent className="space-y-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-background/50">
              <div className="p-3 bg-primary/20 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-primary-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" className="text-lg cursor-target" disabled>
            Upgrade Now
          </Button>
          <p className="text-xs text-muted-foreground mt-2">(Not yet available)</p>
        </div>
      </CardContent>
    </Card>
  );
}
