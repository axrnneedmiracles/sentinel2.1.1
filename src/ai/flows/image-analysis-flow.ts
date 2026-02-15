
'use server';
/**
 * @fileOverview A flow for detecting if an image is AI generated using vision analysis.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageAnalysisInputSchema = z.object({
  imageBuffer: z.string().describe("A photo as a data URI that must include a MIME type and use Base64 encoding."),
});
export type ImageAnalysisInput = z.infer<typeof ImageAnalysisInputSchema>;

const ImageAnalysisOutputSchema = z.object({
  score: z.number().min(0).max(100).describe('Score from 0 to 100 where 100 is definitely AI generated.'),
  explanation: z.string().describe('Explanation of why the image is considered AI or real.'),
});
export type ImageAnalysisOutput = z.infer<typeof ImageAnalysisOutputSchema>;

export async function analyzeImageContent(input: ImageAnalysisInput): Promise<ImageAnalysisOutput> {
  return imageAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageAnalysisPrompt',
  input: {schema: ImageAnalysisInputSchema},
  output: {schema: ImageAnalysisOutputSchema},
  prompt: `You are an expert forensic image analyst specializing in detecting AI-generated content.

Analyze the following image for visual artifacts typical of AI generation (e.g., unnatural skin textures, impossible lighting, warped background patterns, inconsistencies in complex details like hands or eyes).

Provide a score from 0 to 100 where:
- 0 means definitively a real, non-AI photograph.
- 100 means definitively AI generated.

Give a clear, technical explanation of your findings.

Photo: {{media url=imageBuffer}}`,
});

const imageAnalysisFlow = ai.defineFlow(
  {
    name: 'imageAnalysisFlow',
    inputSchema: ImageAnalysisInputSchema,
    outputSchema: ImageAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
