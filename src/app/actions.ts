'use server';

import { predictApproximateLocation } from '@/ai/flows/predict-approximate-location';
import type { PredictApproximateLocationInput, PredictApproximateLocationOutput } from '@/ai/flows/predict-approximate-location';

type ActionResult = {
  data?: PredictApproximateLocationOutput;
  error?: string;
};

export async function tracePhoneNumber(input: PredictApproximateLocationInput): Promise<ActionResult> {
  try {
    const result = await predictApproximateLocation(input);
    return { data: result };
  } catch (e: any) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: errorMessage };
  }
}
