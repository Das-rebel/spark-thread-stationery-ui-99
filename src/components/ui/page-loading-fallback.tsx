import { Loader2 } from 'lucide-react';

export function PageLoadingFallback() {
  return (
    <div 
      className="min-h-screen bg-gradient-paper flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
