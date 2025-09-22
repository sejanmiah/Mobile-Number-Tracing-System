import TracerPage from '@/app/components/tracer-page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-background">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex flex-col gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TracerMVP
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Enter any mobile phone number to get an approximate location. Our AI-powered tool analyzes public data to predict the geographical area.
          </p>
        </div>
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>Phone Number Trace</CardTitle>
          </CardHeader>
          <CardContent>
            <TracerPage />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
