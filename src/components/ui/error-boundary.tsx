import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-paper flex items-center justify-center p-4">
          <Card className="paper-card max-w-md w-full p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-seal rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-ink">Something went wrong</h1>
              <p className="text-muted-foreground text-sm">
                We encountered an unexpected error. Please try refreshing the page or return to home.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left">
                <summary className="text-xs text-muted-foreground cursor-pointer">
                  Error Details (Development)
                </summary>
                <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-2 justify-center pt-2">
              <Button 
                onClick={this.handleRetry}
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              <Button 
                onClick={this.handleGoHome}
                className="bg-gradient-ink text-white gap-2"
                size="sm"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}