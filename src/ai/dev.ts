import { config } from 'dotenv';
config();

import '@/ai/flows/link-risk-assessment.ts';
import '@/ai/flows/malicious-link-detection.ts';
import '@/ai/flows/link-safety-feedback.ts';