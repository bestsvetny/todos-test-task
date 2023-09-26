import React, { ErrorInfo } from 'react';

export class ErrorBoundary extends React.Component<
    { fallback: React.ReactNode; children: React.ReactNode },
    {
        hasError: boolean;
        error: Error | null;
    }
> {
    state = {
        hasError: false,
        error: null
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error: ', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
