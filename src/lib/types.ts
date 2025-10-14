export type ScanResult = {
    url: string;
    riskScore: number;
    isMalicious: boolean;
    explanation?: string;
    recommendedActions?: string;
    advice?: string;
    error?: string;
};

export type ScanHistoryItem = ScanResult & {
    id: string;
    scannedAt: string;
};
