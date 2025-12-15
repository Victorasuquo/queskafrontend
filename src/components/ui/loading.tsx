import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
    return (
        <Loader2 className={cn("animate-spin text-[#52F6FF]", sizeMap[size], className)} />
    );
}

interface LoadingProps {
    text?: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    fullPage?: boolean;
}

export function Loading({ text = "Loading...", size = "lg", className, fullPage = false }: LoadingProps) {
    const content = (
        <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
            <Spinner size={size} />
            {text && <p className="text-muted-foreground text-sm">{text}</p>}
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
                {content}
            </div>
        );
    }

    return content;
}

interface LoadingOverlayProps {
    isLoading: boolean;
    text?: string;
    children: React.ReactNode;
}

export function LoadingOverlay({ isLoading, text, children }: LoadingOverlayProps) {
    return (
        <div className="relative">
            {children}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg z-10">
                    <Loading text={text} />
                </div>
            )}
        </div>
    );
}

interface ButtonLoadingProps {
    isLoading: boolean;
    loadingText?: string;
    children: React.ReactNode;
}

export function ButtonContent({ isLoading, loadingText, children }: ButtonLoadingProps) {
    if (isLoading) {
        return (
            <>
                <Spinner size="sm" className="mr-2" />
                {loadingText || "Loading..."}
            </>
        );
    }
    return <>{children}</>;
}

// Inline loading for text areas
export function InlineLoading({ text = "Loading" }: { text?: string }) {
    return (
        <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Spinner size="sm" />
            <span>{text}</span>
        </span>
    );
}

// Skeleton text placeholder
export function TextPlaceholder({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "h-4 bg-muted animate-pulse rounded",
                        i === lines - 1 ? "w-2/3" : "w-full"
                    )}
                />
            ))}
        </div>
    );
}

// Page loading wrapper
interface PageLoadingProps {
    isLoading: boolean;
    skeleton?: React.ReactNode;
    error?: Error | null;
    errorFallback?: React.ReactNode;
    children: React.ReactNode;
}

export function PageLoading({ isLoading, skeleton, error, errorFallback, children }: PageLoadingProps) {
    if (isLoading) {
        return skeleton || <Loading fullPage />;
    }

    if (error) {
        return errorFallback || (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <p className="text-red-500">Error: {error.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-[#52F6FF] hover:underline"
                >
                    Try again
                </button>
            </div>
        );
    }

    return <>{children}</>;
}
