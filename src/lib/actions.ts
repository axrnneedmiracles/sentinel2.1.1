'use server';

import { assessLinkRisk } from '@/ai/flows/link-risk-assessment';
import { maliciousLinkDetection } from '@/ai/flows/malicious-link-detection';
import { linkSafetyFeedback } from '@/ai/flows/link-safety-feedback';
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
        // Run AI checks in parallel for performance
        const [riskAssessment, maliciousDetection] = await Promise.all([
            assessLinkRisk({ url }),
            maliciousLinkDetection({ url })
        ]);

        const isMalicious = maliciousDetection.isMalicious || riskAssessment.isMalicious;
        let feedback = null;
        if (isMalicious) {
            // Only call for feedback if a threat is detected
            feedback = await linkSafetyFeedback({ url, isScam: true });
        }
        
        const combinedResult: ScanResult = {
            url,
            isMalicious,
            // Average the scores for a more balanced assessment
            riskScore: Math.round((riskAssessment.riskScore + maliciousDetection.riskScore * 100) / 2),
            explanation: maliciousDetection.explanation || riskAssessment.reason,
            recommendedActions: maliciousDetection.recommendedActions || riskAssessment.solution,
            advice: feedback?.advice,
        };

        return combinedResult;

    } catch (error) {
        console.error("AI flow failed:", error);
        // Return a structured error response
        return { url, isMalicious: true, riskScore: 85, error: 'Failed to analyze the link due to high traffic or an internal error. Based on the URL pattern, caution is advised. Please try again later for a full analysis.' };
    }
}
