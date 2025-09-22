import TracerPage from '@/app/components/tracer-page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background font-sans">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex flex-col gap-8">
        <div className="text-center space-y-4">
          <div className="inline-block rounded-lg bg-primary/10 p-4">
            <Phone className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            TracerMVP
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
            Enter any mobile phone number to get an approximate location. Our AI-powered tool analyzes public data to predict the geographical area.
          </p>
        </div>
        <Card className="w-full shadow-2xl border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <MapPin className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Phone Number Trace</CardTitle>
          </CardHeader>
          <CardContent>
            <TracerPage />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
