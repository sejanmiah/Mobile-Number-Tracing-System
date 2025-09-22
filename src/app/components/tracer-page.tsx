'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, AlertTriangle, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { tracePhoneNumber } from '@/app/actions';
import type { PredictApproximateLocationOutput } from '@/ai/flows/predict-approximate-location';
import MapDisplay from '@/app/components/map-display';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]\d{3}[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits.').regex(phoneRegex, 'Invalid phone number format.'),
  agree: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions.' }),
  }),
});

export default function TracerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictApproximateLocationOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: '',
      agree: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await tracePhoneNumber({ phoneNumber: values.phoneNumber });

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setResult(response.data);
    }

    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 555-123-4567" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the phone number you want to trace, including country code.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                 <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="agree"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="agree">
                    Agree to terms and conditions
                  </FormLabel>
                  <FormDescription>
                    You acknowledge that this service provides an approximate location and is for informational purposes only. Accuracy is not guaranteed.
                  </FormDescription>
                   <FormMessage className="pt-2" />
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tracing...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Trace Location
              </>
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-4 pt-4">
          <h3 className="text-2xl font-semibold tracking-tight">Trace Result</h3>
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border-2 border-primary shadow-lg">
            <MapDisplay 
              latitude={result.latitude}
              longitude={result.longitude}
              accuracyRadiusMeters={result.accuracyRadiusMeters}
            />
          </div>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>{result.disclaimer}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
