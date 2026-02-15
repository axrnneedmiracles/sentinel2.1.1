
import type { Timestamp } from 'firebase/firestore';

export type ScanResult = {
    url: string;
    riskScore: number;
    isMalicious: boolean;
    explanation?: string;
    recommendedActions?: string;
    advice?: string;
    error?: string;
};

export type ImageAnalysisResult = {
    id: string;
    imageUrl: string;
    metadataScore: number;
    apiScore: number;
    finalScore: number;
    isAiGenerated: boolean;
    metadataFindings: string[];
    aiExplanation: string;
    analyzedAt: string;
};

export type ScanHistoryItem = ScanResult & {
    id: string;
    scannedAt: string;
};

export interface Report {
    id: string;
    title: string;
    url: string;
    author: string;
    comment: string;
    rating: number;
    time: Timestamp;
}

export interface AnalyticsStats {
    totalVisits: number;
    totalScans: number;
}
