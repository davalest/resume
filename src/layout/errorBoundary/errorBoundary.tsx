import {Component, type ErrorInfo, type ReactNode} from "react";
import ErrorPage from "../errorPage/errorPage.tsx";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    failed: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    override state: ErrorBoundaryState = {failed: false};

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {failed: true};
    }

    override componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("Unhandled render error", error, info.componentStack);
    }

    override render() {
        return this.state.failed ? <ErrorPage /> : this.props.children;
    }
}

export default ErrorBoundary;
