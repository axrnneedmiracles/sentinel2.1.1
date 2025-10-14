'use server';

import { analyzeLink } from '@/ai/flows/unified-link-analysis';
import type { ScanResult } from '@/lib/types';

function extractUrl(text: string): string | null {
    // A more robust regex to find URLs, including those without a protocol.
    const urlRegex = /((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?)/g;
    const urls = text.match(urlRegex);
    if (!urls) return null;

    let url = urls[0];
    // Prepend https:// if no protocol is present for the AI flows.
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    
    // Basic validation to check if it's a plausible URL format.
    try {
        new URL(url);
        return url;
    } catch (_) {
        return null;
    }
}

export async function scanMessage(text: string): Promise<ScanResult> {
    const url = extractUrl(text);
    if (!url) {
        return { url: text, isMalicious: false, riskScore: 0, error: 'No valid URL found in the message.' };
    }

    try {
        // Use the new unified flow for a faster, single-call analysis
        const analysisResult = await analyzeLink({ url });
        
        const combinedResult: ScanResult = {
            url,
            isMalicious: analysisResult.isMalicious,
            riskScore: analysisResult.riskScore,
            explanation: analysisResult.explanation,
            recommendedActions: analysisResult.recommendedActions,
            advice: analysisResult.advice,
        };

        return combinedResult;

    } catch (error) {
        console.error("AI flow failed:", error);
        // Return a structured error response
        return { url, isMalicious: true, riskScore: 85, error: 'Failed to analyze the link due to high traffic or an internal error. Based on the URL pattern, caution is advised. Please try again later for a full analysis.' };
    }
}
