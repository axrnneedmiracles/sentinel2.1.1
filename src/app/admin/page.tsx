
'use client';

import { useCommunity } from '@/context/community-context';
import { Shield, Trash2, LogOut, MessageCircleWarning, Star, Users, ScanSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAdmin } from '@/context/admin-context';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAnalytics } from '@/hooks/use-analytics';
import { useState, useEffect } from 'react';

const ReportTime = ({ time }: { time: any }) => {
  const [formattedTime, setFormattedTime] = useState('');
  useEffect(() => {
    if (time) {
      setFormattedTime(formatDistanceToNow(new Date(time.toDate()), { addSuffix: true }));
    } else {
      setFormattedTime('Just now');
    }
  }, [time]);

  return <p className="text-muted-foreground">{formattedTime}</p>;
};

export default function AdminPage() {
  const { reports, deleteReport } = useCommunity();
  const { logout } = useAdmin();
  const { stats, loading } = useAnalytics();

  return (
    <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 space-y-8">
        <Card className="bg-card/30 backdrop-blur-lg border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2 text-2xl text-primary-foreground">
                        <Shield className="text-primary w-8 h-8" />
                        Admin Panel
                    </CardTitle>
                    <CardDescription>Manage community reports and view analytics.</CardDescription>
                </div>
                <Button variant="ghost" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-background/50 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loading ? '...' : stats.totalVisits}</div>
                        <p className="text-xs text-muted-foreground">Total site visits</p>
                    </CardContent>
                </Card>
                <Card className="bg-background/50 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                        <ScanSearch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loading ? '...' : stats.totalScans}</div>
                        <p className="text-xs text-muted-foreground">Total messages scanned</p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>

        <Card className="w-full max-w-3xl bg-card/30 backdrop-blur-lg border-primary/20">
            <CardHeader>
                <h3 className="text-xl font-semibold text-center text-primary-foreground">Community Reports ({reports.length})</h3>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
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
                            <div className="flex items-center gap-2">
                                <Avatar>
                                <AvatarFallback className="bg-secondary text-secondary-foreground">{report.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon">
                                            <Trash2 className="w-4 h-4"/>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will permanently delete this report. This cannot be undone.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteReport(report.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
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
                        <ReportTime time={report.time} />
                        </CardFooter>
                    </Card>
                    ))
                ) : (
                    <div className="text-center py-10">
                    <p className="text-muted-foreground">No community reports yet.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
