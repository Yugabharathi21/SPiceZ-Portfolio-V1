import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center terminal-window p-8 max-w-md">
            <h2 className="text-white text-xl mb-4">Something went wrong</h2>
            <p className="text-white/70 terminal-text mb-4">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-500/30 transition-all"
            >
              Reload Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-white/80 cursor-pointer">Error Details</summary>
                <pre className="text-red-400 text-xs mt-2 p-2 bg-black/50 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
